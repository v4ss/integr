export const factoryAddress = "0x607D9391Bdc4F49d68850c29E0bdC28e4b3d8Fc3";
export const factoryAbi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "softwareId",
                type: "uint256",
            },
        ],
        name: "finalizeValidation",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_intToken",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "softwareId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "submitter",
                type: "address",
            },
        ],
        name: "SoftwareSubmitted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "softwareId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "accepted",
                type: "bool",
            },
        ],
        name: "SoftwareValidated",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "version",
                type: "string",
            },
            {
                internalType: "string",
                name: "publisher",
                type: "string",
            },
            {
                internalType: "string",
                name: "description",
                type: "string",
            },
            {
                internalType: "string",
                name: "hash",
                type: "string",
            },
            {
                internalType: "string",
                name: "downloadLinks",
                type: "string",
            },
        ],
        name: "submitSoftware",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "softwareId",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "approve",
                type: "bool",
            },
        ],
        name: "voteOnSoftware",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getAllSoftwares",
        outputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "version",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "publisher",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "description",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "hash",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "downloadLinks",
                        type: "string",
                    },
                    {
                        internalType: "address",
                        name: "submitter",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "submitTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "yesVotes",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "noVotes",
                        type: "uint256",
                    },
                    {
                        internalType: "bool",
                        name: "isVerified",
                        type: "bool",
                    },
                ],
                internalType: "struct SoftwareValidationPlatform.Software[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "softwareId",
                type: "uint256",
            },
        ],
        name: "getSoftware",
        outputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "version",
                type: "string",
            },
            {
                internalType: "string",
                name: "publisher",
                type: "string",
            },
            {
                internalType: "string",
                name: "description",
                type: "string",
            },
            {
                internalType: "string",
                name: "hash",
                type: "string",
            },
            {
                internalType: "string",
                name: "downloadLinks",
                type: "string",
            },
            {
                internalType: "address",
                name: "submitter",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "submitTime",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "yesVotes",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "noVotes",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "isVerified",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getSoftwareCount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "hasVoted",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "intToken",
        outputs: [
            {
                internalType: "contract INTToken",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "REWARD_AMOUNT",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "softwares",
        outputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "version",
                type: "string",
            },
            {
                internalType: "string",
                name: "publisher",
                type: "string",
            },
            {
                internalType: "string",
                name: "description",
                type: "string",
            },
            {
                internalType: "string",
                name: "hash",
                type: "string",
            },
            {
                internalType: "string",
                name: "downloadLinks",
                type: "string",
            },
            {
                internalType: "address",
                name: "submitter",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "submitTime",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "yesVotes",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "noVotes",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "isVerified",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "SUBMISSION_FEE",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "VALIDATION_DURATION",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
