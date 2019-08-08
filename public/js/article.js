const sendPatchArticleReq = async (number) => {
    const title = document.querySelector('#input-title').value;
    const img = document.querySelector('#input-img').value;
    const body = document.querySelector('#input-body').value;

    try {
        const res = await fetch(`/articles/${number}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `title=${title}&img=${img}&body=${body}`
        })

        if (res.redirected) {
            return window.location.href = res.url;
        }

        throw new Error();

    } catch (err) {
        console.err(err);
    }
}


const sendDeleteArticleReq = async (number) => {
    try {
        const res = await fetch(`/articles/${number}`, {
            method: "DELETE"
        })
  
        if (res.redirected) {
            return window.location.href = res.url;
        }

        throw new Error();
  
    } catch (err) {
        console.err(err);
    }
}
