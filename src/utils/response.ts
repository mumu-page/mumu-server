export class ResponseUtil<D = any> {
    success: boolean = false;
    message: string = ''
    data: D | any = {}

    // constructor(success: boolean, message: string, data: {}) {
    //     this.success = success
    //     this.message = message
    //     this.data = data
    // }

    ok(data: D | any, message?: string) {
        this.success = true
        this.data = data
        this.message = message || '操作成功';
        return this
    }

    fail(data?: D | any, message?: string) {
        this.success = false
        this.data = data || null
        this.message = message || '操作失败';
        return this
    }
}
