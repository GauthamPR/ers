pragma solidity ^0.8.13;
contract ers {

    struct Code {
    uint exam_id;
    string student_id_hash;
    string answer_sheet_hash;
    address public_addr_uploader;
    
  }
    mapping(string => Code) public codes;

    function createCode(uint string string address memory exam_id answer_sheet_hash answer_sheet_hash public_addr_uploader) 
    public {
    codes[answer_sheet_hash] = Code(exam_id,student_id_hash,answer_sheet_hash,public_addr_uploader);
}
}
