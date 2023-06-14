import { bsc, bscTestnet, Chain } from 'wagmi/chains';

export const chainSelected: Chain[] = [
	bsc,
	{
		id: 97,
		name: 'Binance Smart Chain Testnet',
		network: 'bsc-testnet',
		nativeCurrency: {
			decimals: 18,
			name: 'BNB',
			symbol: 'tBNB'
		},
		rpcUrls: {
			default: {
				http: [
					'https://ultra-ultra-lake.bsc-testnet.discover.quiknode.pro/7a779312b6d2ccce992da842cb11f94b705aa644/'
				]
			},
			public: {
				http: [
					'https://ultra-ultra-lake.bsc-testnet.discover.quiknode.pro/7a779312b6d2ccce992da842cb11f94b705aa644/'
				]
			}
		},
		blockExplorers: {
			etherscan: {
				name: 'BscScan',
				url: 'https://testnet.bscscan.com'
			},
			default: {
				name: 'BscScan',
				url: 'https://testnet.bscscan.com'
			}
		}
	}
];
