// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Roles
 * @dev Library for managing addresses assigned to a Role.
 */
library Roles {
    struct Role {
        mapping(address => bool) bearer;
    }

    /**
     * @dev give an account access to this role
     */
    function add(Role storage role, address account) internal {
        require(account != address(0));
        require(!has(role, account));

        role.bearer[account] = true;
    }

    /**
     * @dev remove an account's access to this role
     */
    function remove(Role storage role, address account) internal {
        require(account != address(0));
        require(has(role, account));

        role.bearer[account] = false;
    }

    /**
     * @dev check if an account has this role
     * @return bool
     */
    function has(Role storage role, address account)
        internal
        view
        returns (bool)
    {
        require(account != address(0));
        return role.bearer[account];
    }
}

contract PowerCounter {
    using Roles for Roles.Role;
    uint256 private counter;
    Roles.Role private whitelists;

    constructor() {
        counter = 0;

        // Add your own whitelists here
        whitelists.add(msg.sender);
        whitelists.add(0x71176050F16Ac840fCdb330c6129Fc2e76E89948);
        whitelists.add(0x662daD1E4D7ECA151B6FbB6DFE5C8b8291a7F104);
    }

    function getCounter() public view returns (uint256) {
        return counter;
    }

    function increase_counter() public {
        require(whitelists.has(msg.sender), "DOES_NOT_IN_WHITELISTS");
        ++counter;
    }

    function decrease_counter() public {
        require(whitelists.has(msg.sender), "DOES_NOT_IN_WHITELISTS");
        if (counter > 0) {
            --counter;
        }
    }
}
