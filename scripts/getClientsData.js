// settings
const BASE_URL = `http://94.103.91.4:5000/`
const LIMIT = 1000; //limit of the list
const OFFSET = 0; //number of skipped entries

export const clientsData = await getClientsList(BASE_URL, LIMIT, OFFSET);

// create client with random username
async function createClient(URL) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': Math.random().toString(36).substring(7),
        })
    };

    try {
        const response = await fetch(URL + 'auth/registration', options);
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(`\n HTTP error! status: ${response.status}, \n message: ${errorData.message}`);
        }
        const data = await response.json();
        return {
            username: JSON.parse(options.body).username,
            token: data.token
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
    
}

// get clients statuses
async function getClientsStatuses(URL, userIds, token) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify({
            'userIds': userIds
        })
    }

    try {
        const response = await fetch(URL + 'clients', options);
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(`\n HTTP error! status: ${response.status}, \n message: ${errorData.message}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// get list of clients with statuses
async function getClientsList(URL, limit, offset) {
    const { token } = await createClient(URL);

    const limitStr = limit.toString();
    const offsetStr = offset.toString();

    const fullURL = URL + `clients?limit=${limitStr}&offset=${offsetStr}`
    console.log('Full URL:', fullURL);

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    };

    try {
        const response = await fetch(fullURL, options);
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(`\n HTTP error! status: ${response.status}, \n message: ${errorData.message}`);
        }
        const data = await response.json();


        const userIds = data.map(person => person.id);
        const statuses = await getClientsStatuses(URL, userIds, token);


        const usersWithStatuses = data.map(person => ({
            ...person,
            status: statuses[person.id]?.status || 'Unknown'
        }));

        // console.log('Get Users with statuses:', usersWithStatuses);
        return usersWithStatuses;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}



// log using token
async function loginClient(URL) {
    const { username, token } = await createClient(URL);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username,
            'token': token
        })
    };

    try {
        const response = await fetch(URL + 'auth/login', options);
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(`\n HTTP error! status: ${response.status}, \n message: ${errorData.message}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }

}