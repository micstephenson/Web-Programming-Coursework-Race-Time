import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.static('raceControl'));
app.use(express.json());

let results;
let raceNum = 1;
let raceDownloadNum = raceNum;

function getResults(req, res) {
    res.json(results);
}

function postResult(req, res) {
    console.log('post request')
    const runnerResults = req.body;   
     
    results = runnerResults
    // results.push(runnerResults);

    console.log('Updated results array:', results);

    saveResults();
    res.send(200);
}

function convertToString(data) {
    let resultsString = 'Position, Name, Racer Number, Lap Time\n';
    console.log(data);
    
    if (data.length === 0) {
        return '';
    } else {
        for (let i = 0; i < data.length; i++) {
            const result = data[i];
            resultsString += `${result.position || 'N/A'}, ${result.racerName || 'N/A'}, ${result.racerNum || 'N/A'}, ${result.lap_time || 'N/A'}\n`;
        }
    } return resultsString;
}

function saveResults(){        
    const csvData = convertToString(results);
    console.log('Generated CSV data:\n', csvData);
    fs.writeFileSync(`results${raceNum}.csv`, csvData, 'utf8')
    console.log(`Results saved to results${raceNum}.csv`);
}

function incrementRaceNum(req, res) {
    raceNum++;
    res.json({ raceNum });
}

function getRaceNum(req, res) {
    res.json({ raceNum: raceNum});
}

function downloadResults(req, res){
    raceDownloadNum = parseInt(req.query.raceNum, 10);
    const filePath = `results${raceDownloadNum}.csv`;
    if (fs.existsSync(filePath)) {
        res.download(filePath, `race${raceDownloadNum}_results.csv`, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error downloading')
            }
        });
    } else {
        res.status(404).send('File not found');
    }
}

app.get('/download', downloadResults);
app.get('/results', getResults);
app.get('/raceNum', getRaceNum);


app.post('/results', postResult);
app.post('/incrementRaceNum', incrementRaceNum);

app.listen(8080, () => {
    console.log('Server is running on port 8080 at http://localhost:8080')
});
