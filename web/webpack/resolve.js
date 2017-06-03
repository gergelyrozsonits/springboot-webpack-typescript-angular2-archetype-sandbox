const path = require('path');

module.exports = {
    extensions : [ '.js', '.ts' ],
    alias : {
        'app' : path.join(process.cwd(), 'src', 'main', 'ts', 'app'),
    }
};
