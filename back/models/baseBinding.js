exports.resultTransaction = function (isErr = false, data = {}) {
    this.err = isErr;
    this.data = data;
}