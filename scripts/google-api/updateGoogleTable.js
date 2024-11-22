import { google } from 'googleapis';
import authorize from './getCredentialsGoogle.js';
import { clientsData } from '../getClientsData.js';

// settings
const SPREADSHEET_ID = '1yoi6OwqfY6iPBjidodr8aqdlINSt9mnju1U9KCr4roI'; // id of the table
const NAME_OF_SHEET = 'Лист1';
const SHEET_RANGE = 'A1:I';

async function updateSheet(auth) {
    const sheets = google.sheets({version: 'v4', auth});

    const categories = [
      'id',
      'firstName',
      'lastName',
      'gender',
      'address',
      'city',
      'phone',
      'email',
      'status'
    ];
    const valuesOfTheClients = clientsData.map(client => [
     client.id,
     client.firstName,
     client.lastName,
     client.gender,
     client.address,
     client.city,
     client.phone,
     client.email,
     client.status
     ]);
     const values = [categories, ...valuesOfTheClients];

     console.log('values ', values )

    try {
      const result = await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${NAME_OF_SHEET}!${SHEET_RANGE}`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: values
        },
      });
  
      console.log('%d cells updated.', result.data.updatedCells);
      return result;
    } catch (err) {
      console.error('The API returned an error: ' + err);
      throw err;
    }
  }
  
  authorize()
     .then(updateSheet)
     .catch(console.error);