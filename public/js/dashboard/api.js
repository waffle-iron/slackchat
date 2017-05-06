function getVisitorData () {
    const URL = 'http://127.0.0.1:9090'
    const teamId = window.location.pathname.split('/')[1];
    
    return axios.get(`${URL}/api/accounts/${teamId}`)
    .then(function (res) {
        if (res.data) {
            // TODO (nnur): remove this later, and do it on
            // the server with query params
            const totalGraphSize = 15;
            const numPaddingData = totalGraphSize - res.data.visitorData.length;
            for (let i = 0; i < numPaddingData; i++) {
                let { date } = res.data.visitorData[res.data.visitorData.length - 1];
                res.data.visitorData.push({date: date - 1, numVisitors:0 });
            }
            return res.data.visitorData.reverse();
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

export default getVisitorData;