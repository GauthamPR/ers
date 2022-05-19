// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract ERS {
    string[] answer_sheet_ids;

    struct AnswerSheet {
        string exam_id;
        string student_id_hash;
        string answer_sheet_hash;
        address public_addr_uploader;
        address public_addr_reviewer;
        string[] review_ids;
        mapping(string => uint256[]) marks;
    }
    mapping(string => AnswerSheet) public answer_sheets;

    function viewAnswerSheets() public view returns (string[] memory) {
        return answer_sheet_ids;
    }

    function viewAnswerSheetReviewer(string memory answer_sheet_hash) public view returns (address) {
        return answer_sheets[answer_sheet_hash].public_addr_reviewer;
    }

    function createAnswerSheet(
        string memory exam_id,
        string memory student_id_hash,
        string memory answer_sheet_hash,
        address public_addr_uploader,
        address public_addr_reviewer
    ) public {
        answer_sheet_ids.push(answer_sheet_hash);
        AnswerSheet storage r = answer_sheets[answer_sheet_hash];
        r.exam_id = exam_id;
        r.student_id_hash = student_id_hash;
        r.answer_sheet_hash = answer_sheet_hash;
        r.public_addr_uploader = public_addr_uploader;
        r.public_addr_reviewer = public_addr_reviewer;
    }

    function getYetToReview(address public_addr_reviewer)
        public
        view
        returns (string[] memory)
    {
        uint256 arrayLength = answer_sheet_ids.length;
        uint256 idx = 0;
        string[] memory yetToReview = new string[](arrayLength);
        for (uint256 i = 0; i < arrayLength; i++) {
            if (
                answer_sheets[answer_sheet_ids[i]].public_addr_reviewer ==
                public_addr_reviewer
            ) {
                yetToReview[idx++] = answer_sheet_ids[i];
            }
        }
        return yetToReview;
    }

    function addMarks(
        string memory uniqueId,
        string memory answer_sheet_hash,
        address public_addr_reviewer,
        uint256[] memory marks
    ) public {
        require(
            answer_sheets[answer_sheet_hash].public_addr_reviewer ==
                public_addr_reviewer,
            "Review not allowed for this user"
        );
        answer_sheets[answer_sheet_hash].review_ids.push(uniqueId);
        answer_sheets[answer_sheet_hash].marks[uniqueId] = marks;
        answer_sheets[answer_sheet_hash].public_addr_reviewer = address(0);
    }

    function viewFinalMarks(string memory answer_sheet_hash)
        public
        view
        returns (uint256[] memory)
    {
        uint256 lastIdx = answer_sheets[answer_sheet_hash].review_ids.length - 1;
        return
            answer_sheets[answer_sheet_hash].marks[
                answer_sheets[answer_sheet_hash].review_ids[lastIdx]
            ];
    }

    function viewReviews(string memory answer_sheet_hash)
        public
        view
        returns (string[] memory)
    {
        return answer_sheets[answer_sheet_hash].review_ids;
    }
}
