const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    const { action = 'get' } = event.queryStringParameters;
    const counterPath = path.join(process.cwd(), 'download-counter.json');
    
    try {
        let counter = { count: 0 };
        
        if (fs.existsSync(counterPath)) {
            counter = JSON.parse(fs.readFileSync(counterPath, 'utf8'));
        }
        
        if (action === 'increment') {
            counter.count += 1;
            fs.writeFileSync(counterPath, JSON.stringify(counter));
        }
        
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(counter)
        };
    } catch (err) {
        return { 
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};
