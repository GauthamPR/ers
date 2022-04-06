pragma solidity ^0.8.13;
contract ers {
    uint public taskCount = 0;

    struct Task {
    string student_id_hash;
    string answer_sheet_hash;
    type public_addr_uploader;
    
  }
    mapping(uint => Task) public tasks;

    function createTask(string student_id_hash) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount,stdId_hash,ans_heet_hash,pub_addr);
}
}
