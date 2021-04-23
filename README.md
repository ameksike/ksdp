# KsDp library 
Design Patterns: Elements of Reusable Object Oriented Software


```Js
const KsDp = require('ksdp');

const helper = new KsDp.integration.IoC();

helper.configure({ 
    name: 'helper',
    path: '../../', 
    src: {
        "Crypto": {
            "module": "app",
            "path": "service"
        },
        "Security": {
            "type": "alias",
            "source": "Crypto"
        }
        "Demo": {
            "type": "raw",
            "options": "service"
        }
    }
});

const cripto = helper.get('Crypto');
const data = cripto.encode("this is a demo");

const cripto = helper.get('Security');
const data = cripto.encode("this is a demo");

```