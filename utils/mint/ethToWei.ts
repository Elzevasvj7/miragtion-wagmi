import { ethers } from 'ethers';

export default function EthToWei(n: any) {
	return ethers.utils.parseUnits(n.toString(), 'ether');
}
