const AWSEC2 = require('aws-sdk')
const existing = require("../data/regions.json")

AWSEC2.config.update({
    region: 'us-west-2'
})
var ec2Client = new AWSEC2.EC2();

const run = async function (callback) {
    try {
        const regions = await ec2Task('describeRegions', null, ec2Client)
        regions.Regions.forEach(r => {
            //search in existing
            var find = existing.filter(e => {
                return r.RegionName == e.id
            })
            if (find.length) {
                console.log(`Found ${r.RegionName} ${r.Endpoint}`)
            } else {
                console.log(`Not found ${r.RegionName} ${r.Endpoint}`)
            }

        });
        //callback(regions)
    } catch (e) {
        console.log('Error is: ' + e)
        throw e
    }
}
run(function (err, data) {
    if (err) console.log(err)

    //console.log(JSON.parse(data))
})

async function ec2Task(task, params = {}, ec2Client) {
    console.log(task)

    if (params == null) {
        params = {}
    }
    console.log(params)
    return new Promise(function (resolve, reject) {

        ec2Client[task](params, function (err, data) {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}