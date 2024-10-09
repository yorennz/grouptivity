export const handleError = (status: number, json: JSON) => {
    const obj = JSON.parse(JSON.stringify(json));

    switch (status) {
        case 401:
            alert(status + ": " + obj.detail);  
        case 404:
            console.error(status + ": " + obj.detail);
            break;
        case 422:
            console.error(status + ": " + obj.detail.msg);
            break;
        default:
            console.error("Unknown error");
            break;
    }
}