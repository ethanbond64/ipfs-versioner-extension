import ipfsApi
from datetime import datetime
import tempfile
import os

api = ipfsApi.Client("127.0.0.1", 5001)
res = api.add("test.txt")


NAME_PREFIX = "vext_"
TEMP_DIR = "tfiles"


class DistributedTextfile:

    localGateway = ipfsApi.Client("127.0.0.1", 5001)

    def __init__(self, contents, identifier):
        self.contents = contents
        self.identifier = identifier
        self.filename = DistributedTextfile.generateFileName(identifier)
        self.tmpFilename = None
        self.response = None

    def upload(self):

        # Create temp file
        with tempfile.NamedTemporaryFile(prefix=self.filename, dir=TEMP_DIR) as tmp:

            self.tmpFilename = tmp.name

            print(self.tmpFilename)
            print(TEMP_DIR + self.tmpFilename.split(TEMP_DIR)[-1])

            tmp.write(bytes(self.contents, "utf-8"))

            # tmp.close()

            Upload file
            self.response = DistributedTextfile.localGateway.add(self.tmpFilename)

        # return self.response.get("Hash")

    @staticmethod
    def generateFileName(identifier):
        return NAME_PREFIX + identifier.replace(" ", "") + "_" + str(datetime.now())
 