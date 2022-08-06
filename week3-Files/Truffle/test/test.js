const XYZCoin = artifacts.require("XYZCoin");

contract ("XYZCoin", async accounts => {
    //---------------------------------Assignment 4.(h)--------------------------------------------------
    it("Initial token balance equal to total token supply",
    async() => {
        let xyzCoinInstance = await XYZCoin.deployed();
        let owner = await xyzCoinInstance.owner();

        assert.equal(await xyzCoinInstance.balanceOf(owner), await xyzCoinInstance.totalSupply());
    });

    it("Token can be transfered",
    async() => {
        let xyzCoinInstance = await XYZCoin.deployed();
        let receiver = 3450;

        assert(await xyzCoinInstance.transfer(receiver, 500));
        assert.equal(await xyzCoinInstance.balanceOf(receiver), 500);
    });

    it("Allowance can be set and read",
    async() => {
        let xyzCoinInstance = await XYZCoin.deployed();
        let spender = 3450;
        let owner = await xyzCoinInstance.owner();

        assert(await xyzCoinInstance.approve(spender, 500));
        assert.equal(await xyzCoinInstance.allowance(owner. spender), 500);
    });

    it("Account can transfer on behalf of other accounts",
    async() => {
        let xyzCoinInstance = await XYZCoin.deployed();
        let owner = await xyzCoinInstance.owner();
        let receiver = 7450;

        assert(await xyzCoinInstance.approve(owner, 500));
        assert(await xyzCoinInstance.transferFrom(owner, receiver, 250));
        assert.equal(await xyzCoinInstance.balanceOf(receiver), 250);
    });




    //---------------------------------Assignment 4.(i)--------------------------------------------------
    it("insufficient balance account transfer reverse",
    async() => {
        let xyzCoinInstance = await XYZCoin.deployed();
        let receiver = 3450;
        await xyzCoinInstance.transfer(receiver, 500);

        await truffleAssert.fails(
            await xyzCoinInstance.transfer(receiver, 700),
            truffleAssert.ErrorType.REVERT,
            "insufficient balance"
        );
    });

    it("Unauthorized transaction reverse",
    async() => {
        let xyzCoinInstance = await XYZCoin.deployed();
        let receiver = 3450;
        let owner = await xyzCoinInstance.owner();
        await xyzCoinInstance.transfer(receiver, 500);

        await truffleAssert.fails(
            await xyzCoinInstance.transferFrom(reveiver, owner, 300),
            truffleAssert.ErrorType.REVERT,
            "Unauthorized transfer"
        );
    });

    it("Transfer event fired",
    async() => {
        let xyzCoinInstance = await XYZCoin.deployed();
        let receiver = 3450;
        let owner = await xyzCoinInstance.owner();

        await truffleAssert.eventEmitted(
            await xyzCoinInstance.transfer(receiver, 0),
            'Transfer'
        );

        await truffleAssert.eventEmitted(
            await xyzCoinInstance.transfer(receiver, 100),
            'Transfer'
        );

        await xyzCoinInstance.approve(owner, 500);

        await truffleAssert.eventEmitted(
            await xyzCoinInstance.transferFrom(owner, receiver, 250),
            'Transfer'
        );
    });

    it("Approval event fired",
    async() => {
        let xyzCoinInstance = await XYZCoin.deployed();
        let spender = 3450;

        await truffleAssert.eventEmitted(
            await xyzCoinInstance.approve(spender, 500),
            'Approval'
        );
    });
})