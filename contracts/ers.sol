pragma solidity ^0.8.13;
contract ers {

    struct Code {
    string exam_id;
    string student_id_hash;
    string answer_sheet_hash;
    address public_addr_uploader;
    
  }
    mapping(string => Code) public codes;

    function createCode(string memory exam_id, string memory student_id_hash,string memory answer_sheet_hash,address public_addr_uploader) 
    public {
    codes[answer_sheet_hash] = Code(exam_id,student_id_hash,answer_sheet_hash,public_addr_uploader);
}
}
