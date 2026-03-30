const { ethers } = require("ethers");

/**
 * Creates an EIP-712 signature for a CoW Protocol swap.
 */
async function createCowOrder(wallet, sellToken, buyToken, sellAmount, minBuyAmount) {
    const domain = {
        name: "Gnosis Protocol",
        version: "v2",
        chainId: 1, // Mainnet
        verifyingContract: "0x9008D19f58AAb51067f3f10e58d6383181947607" // CoW Settlement
    };

    const types = {
        Order: [
            { name: "sellToken", type: "address" },
            { name: "buyToken", type: "address" },
            { name: "receiver", type: "address" },
            { name: "sellAmount", type: "uint256" },
            { name: "buyAmount", type: "uint256" },
            { name: "validTo", type: "uint32" },
            { name: "appData", type: "bytes32" },
            { name: "feeAmount", type: "uint256" },
            { name: "kind", type: "string" },
            { name: "partiallyFillable", type: "bool" },
            { name: "sellTokenBalance", type: "string" },
            { name: "buyTokenBalance", type: "string" }
        ]
    };

    const order = {
        sellToken,
        buyToken,
        receiver: wallet.address,
        sellAmount,
        buyAmount: minBuyAmount,
        validTo: Math.floor(Date.now() / 1000) + 3600, // 1 hour
        appData: ethers.ZeroHash,
        feeAmount: 0, // Solvers take fee from sellToken
        kind: "sell",
        partiallyFillable: false,
        sellTokenBalance: "erc20",
        buyTokenBalance: "erc20"
    };

    const signature = await wallet.signTypedData(domain, types, order);
    console.log("CoW Order Signature generated:", signature);
    return { order, signature };
}
