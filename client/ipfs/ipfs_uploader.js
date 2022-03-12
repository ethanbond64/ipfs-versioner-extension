// import { create } from 'ipfs-http-client';
import * as IPFS from 'ipfs-core'


async function upload() {
    const ipfs = await IPFS.create()


    var contents = [
        "test",
        "upload",
        "via",
        "gateway",
        "on node e1",
    ]

    // var f = new File(contents, "etest.txt");

    // console.log("file created");

    const { cid } = await ipfs.add(contents)

    console.log("file created");

    console.log("Url: " + cid);

}

upload();
