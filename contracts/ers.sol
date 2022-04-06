pragma solidity ^0.8.13;
contract ers {

    struct Task {
    string student_id_hash;
    string answer_sheet_hash;
    address public_addr_uploader;
    
  }
    mapping(string => Task) public tasks;

    function createTask(string memory answer_sheet_hash) public {
    taskCount ++;
    tasks[taskCount] = Task(student_id_hash,answer_sheet_hash,public_addr_uploader);
}
}
