import ipfsApi


api = ipfsApi.Client("127.0.0.1", 5001)
res = api.add("test.txt")
