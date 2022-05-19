// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract ERS {
    string[] answer_sheets;

    struct Code {
        string exam_id;
        string student_id_hash;
        string answer_sheet_hash;
        address public_addr_uploader;
        address public_addr_reviewer;
        uint256[] marks;
    }
    mapping(string => Code) public codes;

    function createCode(
        string memory exam_id,
        string memory student_id_hash,
        string memory answer_sheet_hash,
        address public_addr_uploader,
        address public_addr_reviewer
    ) public {
        uint256[] memory a = new uint256[](0);
        answer_sheets.push(answer_sheet_hash);
        codes[answer_sheet_hash] = Code(
            exam_id,
            student_id_hash,
            answer_sheet_hash,
            public_addr_uploader,
            public_addr_reviewer,
            a
        );
    }

    function getYetToReview(address public_addr_reviewer)
        public
        view
        returns (string[] memory)
    {
        uint256 arrayLength = answer_sheets.length;
        uint256 idx = 0;
        string[] memory yetToReview = new string[](arrayLength);
        for (uint256 i = 0; i < arrayLength; i++) {
            if (
                codes[answer_sheets[i]].public_addr_reviewer ==
                public_addr_reviewer
            ) {
                yetToReview[idx++] = answer_sheets[i];
            }
        }
        return yetToReview;
    }

    function addMarks(string memory answer_sheet_hash, uint256[] memory marks)
        public
    {
        codes[answer_sheet_hash].marks = marks;
    }
}
