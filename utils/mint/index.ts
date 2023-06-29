import { Signer, ethers } from "ethers";
import ethToWei from "./ethToWei";
import abiBuyAssets from "@/abi/BuyAssets.json";
import { getMaxPriorityFeePerGas } from "./getFee";
import { isHexString, hexToBigInt } from "@metamask/utils";

const buyAssetsAddress = "0x5481bbac79eb3effa875da701e0de06ad0ab2b8e";
const gasLimit = (process.env.NEXT_PUBLIC_GAS_LIMIT || 1864222) as Number;
const Contracts: any = {
  USDT: process.env.NEXT_PUBLIC_USDT_ADDRESS as string,
  BUSD: process.env.NEXT_PUBLIC_BUSD_ADDRESS as string,
  LNDA: process.env.NEXT_PUBLIC_LNDA_ADDRESS as string,
};

export const buyAssetsWithBNB = async (
  provider: any,
  signer: any,
  totalAmount: number,
  feeData?: any,
  quantity?: number
) => {
  let hasData = false;
  console.log("provider: ", provider);

  const maxPriorityFee = feeData;
  const assetQuantity: number = 1;
  let args: Array<any> = [ethToWei(totalAmount), assetQuantity];
  args.push({
    gasLimit: Number(186422),
    maxPriorityFeePerGas: maxPriorityFee?.toString(),
    value: ethToWei(totalAmount),
  });
  try {
    const contractBuyAsset = new ethers.Contract(
      buyAssetsAddress,
      abiBuyAssets,
      signer
    );
    console.log("args: ", args);

    let txBuyAsset = await contractBuyAsset.functions["buyPackageNative"](
      ...args
    );
    let result = await txBuyAsset.wait();
    hasData = result && result.status === 1;
    let assetId = "";
    const tokensId: any[] = [];
    result?.events.forEach((element: any, index: any) => {
      assetId = element.topics[3];
      if (isHexString(assetId)) {
        const tokenid = hexToBigInt(assetId).toString();
        tokensId.push(tokenid);
      }
    });

    if (!hasData) {
      return {
        data: [],
        hasData: false,
        hasError: "Ocurrio un error con la compra del asset",
      };
    }
    return {
      data: { tokensId, txHash: txBuyAsset.data },
      hasData,
      hasError: false,
    };
  } catch (error) {
    return {
      data: [],
      hasData: false,
      hasError: error as string,
    };
  }
};
