//import axios from 'axios';

// function getVisitorData () {
//     console.log('hahaha')
//     const URL = 'http://127.0.0.1:9090'
//     const teamId = window.location.pathname.split('/')[1];

//     return axios.get(`${URL}/api/accounts/${teamId}`)
//     .then(res => {
//         console.log('lemmons')
//         if (res.data) {
//             // TODO (nnur): remove this later, and do it on
//             // the server with query params
//             const totalGraphSize = 15;
//             const numPaddingData = totalGraphSize - res.data.visitorData.length;
//             for (let i = 0; i < numPaddingData; i++) {
//                 let { date } = res.data.visitorData[res.data.visitorData.length - 1];
//                 res.data.visitorData.push({date: date - 1, numVisitors:0 });
//             }
//             return res.data.visitorData.reverse();
//         }
//     })
//     .catch(error => { console.log(error) });
// }

function getVisitorData () {
    console.log('hahaha')
    const URL = 'http://127.0.0.1:9090'
    const teamId = window.location.pathname.split('/')[1];

    return fetch(`${URL}/api/accounts/${teamId}`, {method: 'get'})
    .then(function(response) {
        console.log(response)
    }).catch(function(err) {
        console.log(err)
    });
}

export default getVisitorData;