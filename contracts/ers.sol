pragma solidity ^0.8.13;
contract ers {
    uint public taskCount = 0;

    struct Task {
    uint student_id_hash;
    uint answer_sheet_hash;
    uint public_addr_uploader;
    string content;
    bool completed;
  }
    mapping(uint => Task) public tasks;

    function createTask(string memory _content) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _content, false);
}
}
