import { Injectable } from '@nestjs/common';
import { EntityManager, getRepository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { ResponseUtil } from 'src/utils/response';
import { Octokit } from '@octokit/core';
import * as download from 'download-git-repo';
import * as fs from 'fs';
import * as process from 'child_process';
import utils from 'src/utils/fileUtils';

const octokit = new Octokit({
  auth: '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',
});

const TPL_DIR = 'tpl';
const BUILD_DIR = 'build';

function downloadFunc(downloadRepoUrl, temp_dest) {
  console.log('开始下载模版...');
  return new Promise(async (resolve, reject) => {
    download(downloadRepoUrl + '#main', temp_dest, (err) => {
      if (err) {
        reject('模板下载失败!');
      } else {
        console.log('模板下载成功!');
        resolve('模板下载成功!');
      }
    });
  });
}

async function release(repoUrl, repoName) {
  console.log('开始上传模版...');
  try {
    process.execSync(
      [
        `cd ${TPL_DIR}/${repoName}/${BUILD_DIR}`,
        `git init`,
        `git remote add origin ${repoUrl}`,
        `git add -A`,
        `git commit -m 'deploy'`,
        `git branch gh-pages`,
        `git checkout gh-pages`,
        `git push -f origin gh-pages`,
        `cd -`, // 回到最初目录 liunx
      ].join(' && '),
    );
  } catch (e) {
    console.log('release error');
  } finally {
    process.exec(
      [
        `cd ${TPL_DIR}`,
        `rm -rf ${repoName}`, // linux
        // `rd /s /q ${repoName} ` // window
      ].join(' && '),
      (error) => {
        if (error) {
          console.log('清除模板失败！', error);
        }
      },
    );
  }
}

async function renderTpl(
  {
    // templateGit,
    name: repoName,
    data,
    repoUrl,
    templateConfig,
  },
) {
  if (!(await utils.existOrNot(`./${TPL_DIR}`))) {
    await utils.mkdirFolder(TPL_DIR);
  }

  // 基础模版所在目录，如果是初始化，则是模板名称，否则是项目名称
  const temp_dest = `${TPL_DIR}/${templateConfig.templateName || repoName}`;

  // 下载模板
  if (!(await utils.existOrNot(temp_dest))) {
    await downloadFunc(templateConfig.git || repoUrl, temp_dest);
  }

  // 注入数据
  const res = fs.readFileSync(`${temp_dest}/${BUILD_DIR}/index.html`, 'utf-8');
  let target = res.replace(
    /(?<=<script data-inject>)(.|\n)*?(?=<\/script>)/,
    `window.__mumu_config__= ${JSON.stringify({
      ...data,
      components: data.userSelectComponents,
      pageData: data.config,
    })}`,
  );
  // 修改title
  target = target.replace(
    /(?<=<title>).*?(?=<\/title>)/,
    data.config.projectName,
  );

  // 远程组件注入
  if (data.remoteComponents?.length) {
    let replaceValue = '';
    data.remoteComponents.forEach((item) => {
      const cssStyle = `<link href="${item.css}" rel="preload" as="style">`;
      const jsScripts = `<script src="${item.js}" rel="preload"></script>`;
      replaceValue += `${cssStyle}\n${jsScripts}`;
    });
    target = target.replace(
      /(?<=<!-- remote-script-inject-start -->)(.|\n)*?(?=<!-- remote-script-inject-end -->)/,
      replaceValue,
    );
  }

  fs.writeFileSync(`${temp_dest}/${BUILD_DIR}/index.html`, target);

  await release(repoUrl, templateConfig.templateName || repoName);

  return Promise.resolve({});
}

async function isExistProject(owner, repo) {
  try {
    const { data } = await octokit.request('GET /repos/{owner}/{repo}', {
      owner,
      repo,
    });
    return data;
  } catch (error) {
    // console.log('error', error)
    return false;
  }
}

async function createProject(config) {
  let id, ssh_url;
  // 判断是否已经存在项目，存在则不创建
  const data = await isExistProject('mumu-page', config.name);

  if (data) {
    id = data.id;
    ssh_url = data.ssh_url;
  } else {
    // 创建项目
    const { data } = await octokit.request('POST /orgs/{org}/repos', {
      org: 'mumu-page',
      name: config.name,
    });
    id = data.id;
    ssh_url = data.ssh_url;
  }

  await renderTpl({
    ...config,
    repoUrl: ssh_url,
  });
  return { id, ssh_url };
}

@Injectable()
export class ProjectService {
  async find(query): Promise<ResponseUtil> {
    const list = await getRepository(Project).find({ where: query });
    list.forEach((project) => {
      try {
        if (project.pageConfig) {
          project.pageConfig = JSON.parse(project.pageConfig);
        }
        if (project.gitConfig) {
          project.gitConfig = JSON.parse(project.gitConfig);
        }
        if (project.releaseInfo) {
          project.releaseInfo = JSON.parse(project.releaseInfo);
        }
      } catch (error) {
        console.log(error);
      }
    });
    return new ResponseUtil().ok(list);
  }

  async createProject(body, manager: EntityManager): Promise<ResponseUtil> {
    const { pageConfig } = body;
    const {
      gitName: name,
      templateName,
      templateGit,
      templateId,
      version,
    } = pageConfig.config;
    const result = await createProject({
      ...pageConfig.config,
      name,
      data: pageConfig,
      templateConfig: {
        templateName,
        git: templateGit,
      },
    });

    const project = await manager.save(Project, {
      templateId,
      name,
      pageConfig: JSON.stringify(pageConfig),
      gitConfig: JSON.stringify(result),
      version,
    });
    return new ResponseUtil().ok(project);
  }

  async updateConfig(body, manager: EntityManager): Promise<ResponseUtil> {
    const pageConfig = JSON.stringify(body.pageConfig);
    await manager.update(Project, { id: body.id }, { pageConfig });
    const result = await manager.findOne(Project, {
      where: {
        id: body.id,
      },
    });
    return new ResponseUtil().ok(result);
  }

  async release(body, manager: EntityManager): Promise<ResponseUtil> {
    const { id } = body;
    const project = await manager.findOne(Project, id, {
      where: { id },
    })
    const { pageConfig } = (project || {});
    if (!pageConfig) return new ResponseUtil().fail(null, '发布失败: pageConfig 为空');
    const _pageConfig = JSON.parse(pageConfig);
    const {
      gitName: name,
      templateName,
      templateGit,
    } = _pageConfig?.config || {};

    const config = {
      ..._pageConfig.config,
      name,
      data: _pageConfig,
      templateConfig: {
        templateName,
        git: templateGit,
      },
    };
    // 判断是否存在项目
    const data = await isExistProject('mumu-page', config.name);
    if (!data) return new ResponseUtil().fail(data, '发布失败');
    await renderTpl({
      ...config,
      repoUrl: data.ssh_url,
    });
    return new ResponseUtil().fail(`https://mumu-page.github.io/${name}`, '发布成功');
  }
}
