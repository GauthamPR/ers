pragma solidity ^0.8.13;
contract ers {
    uint public taskCount = 0;

    struct Task {
    string student_id_hash;
    string answer_sheet_hash;
    type public_addr_uploader;
    
  }
    mapping(uint => Task) public tasks;

    function createTask(string memory _content) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _content, false);
}
}
