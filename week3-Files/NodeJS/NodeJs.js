async function countBlocksWithFirstCreate() {
    // Instantiate web3 with HTTP provider
    const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/ac779e84f776449f87d0c5e060ca46eb'))

    //variable use to count number of block that contains contract-creation transaction
    number = 0

    //use getBlock and getBlockNumber to get the earliest and latest block number
    const earliestBlockNum = await web3.eth.getBlock('earliest').number
    const latestBlockNum = await web3.eth.getBlockNumber()

    //initialize a list of block numbers, from earliest to latest
    const blockNumbers = _range(earliestBlockNum, latestBlockNum)

    //for loop iterate through the list
    blockNumbers.forEach((blocknumber)=> {

        //get the block using block number
        const currentBlock = await web3.eth.getBlock(blocknumber)

        //continue if current block does not exist
        if (currentBlock != null) {

            //continue if current block does not contain any transaction
            if (currentBlock.transactions != null && currentBlock.transactions.length != 0) {
                try {

                    //iterate through all transactions in current block
                    currentBlock.transactions.forEach((transaction)=> {

                        //get the transaction using transaction hash
                        const transact = await web3.eth.getTransaction(transaction)

                        //if transaction's recipient is null(a contract creation transaction)
                        //block count(number) plus one, break the current loop and go to next block
                        if (transact.to == null) {
                            number += 1
                            throw 'Break'
                        }
                    })
                } catch (e) {
                    //break out the loop
                    if (e != 'Break') throw e
                }
            }
        }
    })

    //return the final result
    return number
}