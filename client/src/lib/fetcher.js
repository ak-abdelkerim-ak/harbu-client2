export async function fetchJson(...args) {
    const rootUrl = 'http://localhost:3000'
    const url = [rootUrl, args].join('/')
    return await fetch(
        url,
        {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${sessionStorage.accesstoken}`
            }
        }
    )
        .then(async res => {
            if (res.status == 200) return res.json()
            else {
                return await fetch(
                    `${rootUrl}/refreshtoken`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            token: sessionStorage.refreshtoken
                        })
                    }
                )
                    .then(res => {
                        if (res.status == 200) return res.json()
                        else return new Error('Failed to refresh token')
                    })
                    .then(async data => {
                        sessionStorage.accesstoken = data.accesstoken
                        return await fetch(
                            url,
                            {
                                method: "GET",
                                headers: {
                                    'Authorization': `Bearer ${sessionStorage.accesstoken}`
                                }
                            }
                        )
                            .then(res => {
                                if (res.status == 200) return res.json()
                                else throw new Error('Failed to fetch data')
                            })
                            .catch(err => { throw err })
                    })
                    .catch(err => { throw err })
            }
        })
        .catch(err => { throw err })
}
