pragma solidity >=0.5.1;

contract HelloWorld {
    string public str = "Hello, world!";
    function hello() public view returns(string memory) {
        return str;
    }
}