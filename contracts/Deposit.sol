// SPDX-License-Identifier: MIT

pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Deposit is Ownable, Pausable {
    IERC20 private SVE;
    IERC20 private RSVE;

    constructor(
        IERC20 _SVE,
        IERC20 _RSVE
    ) {
        require(address(_SVE) != address(0), "Error: SVE address(0)");
        require(address(_RSVE) != address(0), "Error: RSVE address(0)");
        SVE = _SVE;
        RSVE = _RSVE;
    }

    function withdrawn() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function withdrawnToken(address _token, uint256 _amount) external onlyOwner {
        require(
            IERC20(_token).balanceOf(address(this)) >= _amount,
            "Token insufficient"
        );

        require(
            IERC20(_token).approve(owner(), _amount),
            "Token approve failed!"
        );

        require(IERC20(_token).transfer(owner(), _amount), "Token transfer fail");
    }

    event Desposit(address from, address token, uint256 amount, uint256 time);

    function deposit(address _token, uint256 _amount)
        external
        whenNotPaused
    {
        require(
            _token == address(SVE) || _token == address(RSVE),
            "Error: token invalid"
        );

        emit Desposit(_msgSender(), _token, _amount, block.timestamp);
    }
}
