// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VaultGuard is Ownable {
    /**
     * @dev Approves the CoW Protocol Settlement contract to pull tokens 
     * once a signed order is matched by a solver.
     */
    function enableCowSettlement(address _token, uint256 _amount) external onlyOwner {
        address cowSettlement = 0x9008D19f58AAb51067f3f10e58d6383181947607;
        IERC20(_token).approve(cowSettlement, _amount);
    }
}
