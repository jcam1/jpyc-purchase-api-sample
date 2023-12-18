import { ConnectWallet } from "@thirdweb-dev/react";

export default function Header() {
  return (
    <div className="flex justify-end p-4">
      <ConnectWallet
        theme={"light"}
        modalSize={"compact"}
      />
    </div>
  )
}
