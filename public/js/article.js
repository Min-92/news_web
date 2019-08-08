const sendPatchArticleReq = (number) => {
    const title = document.querySelector('#input-title').value;
    const img = document.querySelector('#input-img').value;
    const body = document.querySelector('#input-body').value;
    
    fetch(`/articles/${number}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `title=${title}&img=${img}&body=${body}`
    }).then(res => {
        if(res.redirected){
            window.location.href = res.url;
        }
    }).catch(err => {
        console.log(err);
    })


}    

