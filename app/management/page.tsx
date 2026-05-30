"use client"


import { useState, useEffect} from "react"


export default function ManagementPage() {

const [authorized, setAuthorized] =
  useState(false)

const [password, setPassword] =
  useState("")

const [editingOffer,setEditingOffer] =
  useState<any>(null)

const [offerName,setOfferName] =
  useState("")

const [offerUrl,setOfferUrl] =
  useState("")

const [showCreateOffer,setShowCreateOffer] =
  useState(false)

const [showCreate,setShowCreate] =
  useState(false)
  
const [campaigns, setCampaigns] =
  useState<any[]>([])

const [activeTab, setActiveTab] =
    useState("campaigns")

const [sources, setSources] =
  useState<any[]>([])
  
const [
  showCreateSource,
  setShowCreateSource
] = useState(false)

const [
  sourceName,
  setSourceName
] = useState("")

const [
  editingSource,
  setEditingSource
] = useState<any>(null)

const [offers, setOffers] =
  useState<any[]>([])

const [networks, setNetworks] =
  useState<any[]>([])

const [
  showCreateNetwork,
  setShowCreateNetwork
] = useState(false)

const [
  networkName,
  setNetworkName
] = useState("")

const [
  editingNetwork,
  setEditingNetwork
] = useState<any>(null)
 
const [campaignName, setCampaignName] =
  useState("")
  
const [
  editingCampaign,
  setEditingCampaign
] = useState<any>(
  null
)

const [sourceId, setSourceId] =
  useState("")

const [offerId, setOfferId] =
  useState("")

const [networkId, setNetworkId] =
  useState("")
  
 useEffect(() => {
 
  async function loadData() {

    const sourceRes =
      await fetch(
        "/api/traffic-sources"
      )

    const sourceData:any =
      await sourceRes.json()

    setSources(
      sourceData.sources || []
    )

    const offerRes =
      await fetch(
        "/api/offers"
      )

    const offerData:any =
      await offerRes.json()

    setOffers(
      offerData.offers || []
    )

    const networkRes =
      await fetch(
        "/api/networks"
      )

    const networkData:any =
      await networkRes.json()

    setNetworks(
      networkData.networks || []
    )

const campaignRes =
  await fetch(
    "/api/campaigns"
  )

const campaignData:any =
  await campaignRes.json()

setCampaigns(
  campaignData.campaigns || []
)

  }

  loadData()

}, []) 

async function createSource() {

  const res =
    await fetch(

      "/api/traffic-sources/create",

      {

        method:"POST",

        headers:{
          "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

          name:
            sourceName

        })

      }

    )

  const data:any =
    await res.json()

  if (data.success) {

    const sourceRes =
      await fetch(
        "/api/traffic-sources"
      )

    const sourceData:any =
      await sourceRes.json()

    setSources(
      sourceData.sources || []
    )

    setSourceName("")

    setShowCreateSource(
      false
    )

  }

}

async function updateSource() {

  const res =
    await fetch(

      `/api/traffic-sources/${editingSource.id}`,

      {

        method:"PUT",

        headers:{
          "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

          name:
            sourceName

        })

      }

    )

  const data:any =
    await res.json()

  if (data.success) {

    const sourceRes =
      await fetch(
        "/api/traffic-sources"
      )

    const sourceData:any =
      await sourceRes.json()

    setSources(
      sourceData.sources || []
    )

    setEditingSource(
      null
    )

    setSourceName("")

    setShowCreateSource(
      false
    )

  }

}

async function deleteSource(
  id:number
) {

  if (
    !confirm(
      "Delete source?"
    )
  ) return

  const res =
    await fetch(

      `/api/traffic-sources/${id}`,

      {
        method:"DELETE"
      }

    )

  const data:any =
    await res.json()

  if (data.success) {

    setSources(

      sources.filter(

        s => s.id !== id

      )

    )

  }

}

async function createNetwork() {
 

  const res =
    await fetch(

      "/api/networks/create",

      {

        method:"POST",

        headers:{
          "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

          name:
            networkName

        })

      }

    )

  const data:any =
    await res.json()

  if (data.success) {

    const networkRes =
      await fetch(
        "/api/networks"
      )

    const networkData:any =
      await networkRes.json()

    setNetworks(
      networkData.networks || []
    )

    setNetworkName("")

    setShowCreateNetwork(
      false
    )

  }

}

async function updateNetwork() {

  const res =
    await fetch(

      `/api/networks/${editingNetwork.id}`,

      {

        method:"PUT",

        headers:{
          "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

          name:
            networkName

        })

      }

    )

  const data:any =
    await res.json()

  if (data.success) {

    const networkRes =
      await fetch(
        "/api/networks"
      )

    const networkData:any =
      await networkRes.json()

    setNetworks(
      networkData.networks || []
    )

    setEditingNetwork(
      null
    )

    setNetworkName("")

    setShowCreateNetwork(
      false
    )

  }

}

async function deleteNetwork(
  id:number
) {

  if (
    !confirm(
      "Delete network?"
    )
  ) return

  const res =
    await fetch(

      `/api/networks/${id}`,

      {
        method:"DELETE"
      }

    )

  const data:any =
    await res.json()

  if (data.success) {

    setNetworks(

      networks.filter(

        n => n.id !== id

      )

    )

  }

}

async function deleteCampaign(
  id:number
) {

  if (
    !confirm(
      "Delete campaign?"
    )
  ) return

  const res =
    await fetch(

      `/api/campaigns/${id}`,

      {
        method:"DELETE"
      }

    )

  const data:any =
    await res.json()

  if (data.success) {

    setCampaigns(

      campaigns.filter(

        (c) =>
          c.id !== id

      )

    )

  }

}

async function createCampaign() {

  const res =
    await fetch(

      "/api/campaigns/create",

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"

        },

        body: JSON.stringify({

          campaignName,

          sourceId,

          offerId,

          networkId

        })

      }

    )

  const data:any =
    await res.json()

  if (data.success) {

    const campaignRes =
      await fetch(
        "/api/campaigns"
      )

    const campaignData:any =
      await campaignRes.json()

    setCampaigns(
      campaignData.campaigns || []
    )

    setCampaignName("")
    setSourceId("")
    setOfferId("")
    setNetworkId("")

    setShowCreate(false)

  }

}

async function updateCampaign() {

  const res =
    await fetch(

      `/api/campaigns/${editingCampaign.id}`,

      {

        method: "PUT",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          name:
            campaignName,

          traffic_source_id:
            sourceId,

          offer_id:
            offerId,

          network_id:
            networkId

        })

      }

    )

  const data:any =
    await res.json()

  if (data.success) {

    const campaignRes =
      await fetch(
        "/api/campaigns"
      )

    const campaignData:any =
      await campaignRes.json()

    setCampaigns(
      campaignData.campaigns || []
    )

    setEditingCampaign(
      null
    )

    setShowCreate(
      false
    )

  }

}

async function createOffer() {

  const res =
    await fetch(

      "/api/offers/create",

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"

        },

        body: JSON.stringify({

          offerName,

          offerUrl

        })

      }

    )

  const data:any =
    await res.json()

if (data.success) {

  const offerRes =
    await fetch("/api/offers")

  const offerData:any =
    await offerRes.json()

  setOffers(
    offerData.offers || []
  )

  setOfferName("")
  setOfferUrl("")

  setShowCreateOffer(false)

}

}

async function deleteOffer(
  id:number
) {

  const confirmed =
    confirm(
      "Delete offer?"
    )

  if (!confirmed) return

  await fetch(

    `/api/offers/${id}`,

    {
      method:"DELETE"
    }

  )

  setOffers(

    offers.filter(
      (offer) =>
        offer.id !== id
    )

  )

}

async function updateOffer() {

  const res =
    await fetch(

      `/api/offers/${editingOffer.id}`,

      {

        method:"PUT",

        headers:{
          "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

          name:
            offerName,

          destination_url:
            offerUrl

        })

      }

    )

  const data:any =
    await res.json()

  if (data.success) {

    const offerRes =
      await fetch(
        "/api/offers"
      )

    const offerData:any =
      await offerRes.json()

    setOffers(
      offerData.offers || []
    )

    setEditingOffer(null)

    setOfferName("")
    setOfferUrl("")

    setShowCreateOffer(false)

  }

}

if (!authorized) {

  return (

<div className="flex min-h-screen items-center justify-center bg-[#0B1220]">

  <div className="w-full max-w-md">

    <div className="mb-8 text-center">

      <h1 className="text-5xl font-bold">

        VIROXA

      </h1>

      <p className="mt-3 text-slate-400">

        Affiliate Tracking Platform

      </p>

    </div>

    <div className="rounded-3xl border border-slate-800 bg-[#111827] p-8">

      <div className="mb-6 text-center">

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">

          🔒

        </div>

        <h2 className="text-2xl font-semibold">

          Management Access

        </h2>

        <p className="mt-2 text-sm text-slate-400">

          Secure dashboard authentication

        </p>

      </div>

      <input

        type="password"

        value={password}

        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }

        placeholder="Enter Password"

        className="
          mb-4
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          p-4
          outline-none
        "

      />

      <button

        onClick={() => {

          if (
            password ===
            "Habiburrohman89"
          ) {

            setAuthorized(
              true
            )

          } else {

            alert(
              "Wrong Password"
            )

          }

        }}

        className="
          w-full
          rounded-xl
          bg-blue-600
          py-4
          font-medium
          transition
          hover:bg-blue-500
        "

      >

        Access Management

      </button>

    </div>

    <p className="mt-6 text-center text-xs text-slate-500">

      Viroxa Tracker © 2026

    </p>

  </div>

</div>

  )

}

  return (

    <div className="grid min-h-screen grid-cols-12 bg-[#0B1220] text-white">

      {/* LEFT SIDEBAR */}

      <div className="col-span-2 border-r border-slate-800 bg-[#111827]">

        <div className="border-b border-slate-800 p-4">

          <h1 className="text-lg font-bold">
            MANAGEMENT
          </h1>

        </div>

        <div className="space-y-3 p-4">

<div
  onClick={() =>
    setActiveTab(
      "traffic-sources"
    )
  }
  className={`

    cursor-pointer
    rounded-lg
    px-3
    py-2
    text-sm

    ${
      activeTab ===
      "traffic-sources"

        ? "border border-blue-500/20 bg-blue-500/10 text-blue-400"

        : "border border-slate-800 text-slate-400"
    }

  `}
>
  Traffic Sources
</div>

<div
  onClick={() =>
    setActiveTab(
      "offers"
    )
  }
  className={`

    cursor-pointer
    rounded-lg
    px-3
    py-2
    text-sm

    ${
      activeTab ===
      "offers"

        ? "border border-blue-500/20 bg-blue-500/10 text-blue-400"

        : "border border-slate-800 text-slate-400"
    }

  `}
>
  Offers
</div>

<div
  onClick={() =>
    setActiveTab(
      "networks"
    )
  }
  className={`

    cursor-pointer
    rounded-lg
    px-3
    py-2
    text-sm

    ${
      activeTab ===
      "networks"

        ? "border border-blue-500/20 bg-blue-500/10 text-blue-400"

        : "border border-slate-800 text-slate-400"
    }

  `}
>
  networks
</div>

 <div
  onClick={() =>
    setActiveTab(
      "campaigns"
    )
  }
  className={`

    cursor-pointer
    rounded-lg
    px-3
    py-2
    text-sm

    ${
      activeTab ===
      "campaigns"

        ? "border border-blue-500/20 bg-blue-500/10 text-blue-400"

        : "border border-slate-800 text-slate-400"
    }

  `}
>
  campaigns
</div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="col-span-10 p-6">

{activeTab === "traffic-sources" && (

  <div>

    <div className="mb-6 flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold">
          Traffic Sources
        </h1>

        <p className="text-slate-400">
          Manage traffic sources
        </p>

      </div>

      <button

        onClick={() =>
          setShowCreateSource(
            true
          )
        }

        className="
          rounded-xl
          bg-blue-600
          px-4
          py-2
          text-sm
        "

      >

        + Create Source

      </button>

    </div>

    <div className="rounded-xl border border-slate-800 bg-[#111827]">

      <table className="w-full text-sm">

        <thead>

          <tr className="border-b border-slate-800">

            <th className="p-4 text-left">
              Source Name
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {sources.map(
            (source:any) => (

              <tr
                key={source.id}
                className="border-b border-slate-800"
              >

                <td className="p-4">
                  {source.name}
                </td>

                <td className="p-4 text-green-400">
                  active
                </td>

<td className="p-4">

  <div className="flex gap-2">

    <button

      onClick={() => {

        setEditingSource(
          source
        )

        setSourceName(
          source.name
        )

        setShowCreateSource(
          true
        )

      }}

      className="
        rounded
        bg-yellow-600
        px-3
        py-1
        text-xs
      "

    >
      Edit
    </button>

<button

  onClick={() =>
    deleteSource(
      source.id
    )
  }

  className="
    rounded
    bg-red-600
    px-3
    py-1
    text-xs
  "

>
  Delete
</button>

  </div>

</td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  </div>

)}

{showCreateSource && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

    <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#111827] p-6">

      <div className="mb-4 flex items-center justify-between">

        <h2 className="text-xl font-bold">

          {editingSource
            ? "Edit Source"
            : "Create Source"}

        </h2>

        <button

          onClick={() => {

            setShowCreateSource(false)

            setEditingSource(null)

            setSourceName("")

          }}

        >
          ✕
        </button>

      </div>

      <input

        value={sourceName}

        onChange={(e) =>
          setSourceName(
            e.target.value
          )
        }

        placeholder="Source Name"

        className="
          mb-4
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          p-3
        "

      />

      <button

        onClick={() => {

          if (
            editingSource
          ) {

            updateSource()

          } else {

            createSource()

          }

        }}

        className="
          w-full
          rounded-xl
          bg-blue-600
          py-3
        "

      >

        {editingSource
          ? "Save Changes"
          : "Create Source"}

      </button>

    </div>

  </div>

)}

{activeTab === "offers" && (

  <div>

    <h1 className="mb-6 text-3xl font-bold">
    
    </h1>

<div>

  <div className="mb-6 flex items-center justify-between">

    <div>

      <h1 className="text-3xl font-bold">
        Offers
      </h1>

      <p className="text-slate-400">
        Manage offer URLs
      </p>

    </div>

<button
  onClick={() =>
    setShowCreateOffer(true)
  }
  className="rounded-xl bg-blue-600 px-4 py-2"
>

  + Create Offer

</button>

  </div>

  <div className="rounded-xl border border-slate-800 bg-[#111827]">

    <table className="w-full text-sm">

      <thead>

        <tr className="border-b border-slate-800">

          <th className="p-4 text-left">
            Offer Name
          </th>

          <th className="p-4 text-left">
            Offer URL
          </th>

          <th className="p-4 text-left">
            Status
          </th>

		<th className="p-4 text-left">
			Actions
			</th>
			
        </tr>

      </thead>

<tbody>

  {offers.length === 0 ? (

    <tr>

      <td
        colSpan={4}
        className="p-10 text-center text-slate-500"
      >

        No offers found

      </td>

    </tr>

  ) : (

    offers.map((offer:any) => (

      <tr
        key={offer.id}
        className="border-b border-slate-800"
      >

        <td className="p-4">
          {offer.name}
        </td>

<td className="p-4 text-cyan-400">

  <div className="max-w-md truncate">

    {offer.destination_url}

  </div>

</td>

        <td className="p-4 text-green-400">
          Active
        </td>

        <td className="p-4">

<div className="flex gap-2">

  <button

    onClick={() => {

      setEditingOffer(offer)

      setOfferName(
        offer.name
      )

      setOfferUrl(
        offer.destination_url
      )

      setShowCreateOffer(true)

    }}

    className="rounded-lg bg-yellow-500 px-3 py-1 text-xs font-medium text-black"
  >

    Edit

  </button>

  <button

    onClick={() =>
      deleteOffer(
        offer.id
      )
    }

    className="rounded-lg bg-red-500 px-3 py-1 text-xs font-medium"
  >

    Delete

  </button>

</div>

        </td>

      </tr>

    ))

  )}

</tbody>

    </table>

  </div>

</div>

  </div>

)}

{activeTab === "networks" && (

  <div>

    <div className="mb-6 flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold">
          Networks
        </h1>

        <p className="text-slate-400">
          Manage affiliate networks
        </p>

      </div>
	  
<button

  onClick={() =>
    setShowCreateNetwork(
      true
    )
  }

  className="
    rounded-xl
    bg-blue-600
    px-4
    py-2
    text-sm
  "

>

  + Create Network

</button>


    </div>

    <div className="rounded-xl border border-slate-800 bg-[#111827]">

      <table className="w-full text-sm">

        <thead>

          <tr className="border-b border-slate-800">

            <th className="p-4 text-left">
              Network Name
            </th>

            <th className="p-4 text-left">
              Status
            </th>

			<th className="p-4 text-left">
			Actions
			</th>

          </tr>

        </thead>

        <tbody>

          {networks.map(
            (network:any) => (

              <tr
                key={network.id}
                className="border-b border-slate-800"
              >

                <td className="p-4">
                  {network.name}
                </td>

                <td className="p-4 text-green-400">
                  active
                </td>
				
				<td className="p-4">
				
				<div className="flex gap-2">
				
					<button
				
					onClick={() => {
				
						setEditingNetwork(
						network
						)
				
						setNetworkName(
						network.name
						)
				
						setShowCreateNetwork(
						true
						)
				
					}}
				
					className="
						rounded
						bg-yellow-600
						px-3
						py-1
						text-xs
					"
				
					>
					Edit
					</button>
					
<button

  onClick={() =>
    deleteNetwork(
      network.id
    )
  }

  className="
    rounded
    bg-red-600
    px-3
    py-1
    text-xs
  "

>
  Delete
</button>
				
				</div>
				
				</td>
              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
{showCreateNetwork && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

    <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#111827] p-6">

      <div className="mb-4 flex items-center justify-between">

        <h2 className="text-xl font-bold">

          {editingNetwork
            ? "Edit Network"
            : "Create Network"}

        </h2>

        <button

          onClick={() => {

            setShowCreateNetwork(false)

            setEditingNetwork(null)

            setNetworkName("")

          }}

        >
          ✕
        </button>

      </div>

      <input

        value={networkName}

        onChange={(e) =>
          setNetworkName(
            e.target.value
          )
        }

        placeholder="Network Name"

        className="
          mb-4
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          p-3
        "

      />

<button

  onClick={() => {

    if (
      editingNetwork
    ) {

      console.log(
        updateNetwork()
      )

    } else {

      createNetwork()

    }

  }}

  className="
    w-full
    rounded-xl
    bg-blue-600
    py-3
  "

>

  {editingNetwork
    ? "Save Changes"
    : "Create Network"}

</button>

    </div>

  </div>

)}
  </div>


)}

        {activeTab === "campaigns" && (

          <>

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h1 className="text-3xl font-bold">
                  Campaigns
                </h1>

                <p className="mt-1 text-slate-400">
                  Manage tracking campaigns
                </p>

              </div>

              <button
				onClick={() =>
					setShowCreate(true)
				}
				className="rounded-xl bg-blue-600 px-4 py-2 text-sm"
				>
				
				+ Create Campaign
				
				</button>

            </div>

            <div className="rounded-xl border border-slate-800 bg-[#111827]">

              <table className="w-full text-sm">

                <thead>

                  <tr className="border-b border-slate-800 text-slate-400">

                    <th className="p-4 text-left">
                      Campaign
                    </th>

                    <th className="p-4 text-left">
                      Source
                    </th>

                    <th className="p-4 text-left">
                      Offer
                    </th>

                    <th className="p-4 text-left">
                      Network
                    </th>

					<th className="p-4 text-left">
					Tracker URL
					</th>
					
					<th className="p-4 text-left">
					Postback URL
					</th>
					
					<th className="p-4 text-left">
					Status
					</th>
					
					<th className="p-4 text-left">
					Actions
					</th>

                  </tr>

                </thead>

<tbody>

  {campaigns.length === 0 ? (

    <tr>

      <td
        colSpan={5}
        className="p-10 text-center text-slate-500"
      >

        No campaigns found

      </td>

    </tr>

  ) : (

    campaigns.map(
      (campaign:any) => (

<tr
  key={campaign.id}
  className="border-b border-slate-800"
>

  <td className="p-4">
    {campaign.name}
  </td>

  <td className="p-4">
    {campaign.traffic_sources?.name}
  </td>

  <td className="p-4">
    {campaign.offers?.name}
  </td>

  <td className="p-4">
    {campaign.networks?.name}
  </td>

  <td className="p-4 text-xs text-cyan-400">
    {campaign.tracker_url}
  </td>

  <td className="p-4 text-xs text-orange-400">
    {campaign.postback_url}
  </td>

  <td className="p-4 text-green-400">
    {campaign.status}
  </td>
<td className="p-4">

  <div className="flex gap-2">

<button

  onClick={() => {

    setEditingCampaign(
      campaign
    )

    setCampaignName(
      campaign.name
    )

    setSourceId(
      campaign.traffic_source_id
    )

    setOfferId(
      campaign.offer_id
    )

    setNetworkId(
      campaign.network_id
    )

    setShowCreate(
      true
    )

  }}

  className="
    rounded
    bg-yellow-600
    px-3
    py-1
    text-xs
  "

>
  Edit
</button>

    <button

      onClick={() =>
        deleteCampaign(
          campaign.id
        )
      }

      className="
        rounded
        bg-red-600
        px-3
        py-1
        text-xs
      "

    >
      Delete
    </button>

  </div>

</td>
</tr>

      )

    )

  )}

</tbody>

              </table>

            </div>

          </>

        )}

      </div>

{showCreateOffer && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

    <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-[#111827] p-6">

      <div className="mb-6 flex items-center justify-between">

<h2 className="text-xl font-bold">

  {editingOffer
    ? "Edit Offer"
    : "Create Offer"}

</h2>



      </div>

      <div className="space-y-4">

<input
  value={offerName}
  onChange={(e) =>
    setOfferName(
      e.target.value
    )
  }
  placeholder="Offer Name"
  className="w-full rounded-xl border border-slate-800 bg-[#0B1220] p-3"
/>

<input
  value={offerUrl}
  onChange={(e)=>
    setOfferUrl(
      e.target.value
    )
  }
  placeholder="Offer URL"
  className="w-full rounded-xl border border-slate-800 bg-[#0B1220] p-3"
/>

<button

  onClick={() => {

    if (editingOffer) {
      updateOffer()
    } else {
      createOffer()
    }

  }}

  className="w-full rounded-xl bg-blue-600 py-3"
>

  {editingOffer
    ? "Save Changes"
    : "Create Offer"}

</button>

      </div>

    </div>

  </div>

)}

{showCreate && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

    <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-[#111827] p-6">

      <div className="mb-6 flex items-center justify-between">

		<h2 className="text-xl font-bold">
		
		{editingCampaign
			? "Edit Campaign"
			: "Create Campaign"}
		
		</h2>

        <button
          onClick={() =>
            setShowCreate(false)
          }
        >
          ✕
        </button>

      </div>

      <div className="space-y-4">

<input
  value={campaignName}
  onChange={(e) =>
    setCampaignName(
      e.target.value
    )
  }
  placeholder="Campaign Name"
  className="w-full rounded-xl border border-slate-800 bg-[#0B1220] p-3"
/>

<select
  value={sourceId}
  onChange={(e) =>
    setSourceId(e.target.value)
  }
  className="w-full rounded-xl border border-slate-800 bg-[#0B1220] p-3"
>

  <option value="">
    Select Traffic Source
  </option>

  {sources.map((source:any) => (

    <option
      key={source.id}
      value={String(source.id)}
    >
      {source.name}
    </option>

  ))}

</select>

<select
  value={offerId}
  onChange={(e) =>
    setOfferId(e.target.value)
  }
  className="w-full rounded-xl border border-slate-800 bg-[#0B1220] p-3"
>

  <option value="">
    Select Offer
  </option>

  {offers.map((offer:any) => (

    <option
      key={offer.id}
      value={String(offer.id)}
    >
      {offer.name}
    </option>

  ))}

</select>

<select
  value={networkId}
  onChange={(e) =>
    setNetworkId(e.target.value)
  }
  className="w-full rounded-xl border border-slate-800 bg-[#0B1220] p-3"
>

  <option value="">
    Select Network
  </option>

  {networks.map((network:any) => (

    <option
      key={network.id}
      value={String(network.id)}
    >
      {network.name}
    </option>

  ))}

</select>

<button

  onClick={() => {

    if (
      editingCampaign
    ) {

      updateCampaign()

    } else {

      createCampaign()

    }

  }}

  className="
    w-full
    rounded-xl
    bg-blue-600
    py-3
    text-sm
    font-medium
  "

>

  {editingCampaign
    ? "Save Changes"
    : "Create Campaign"}

</button>

      </div>

    </div>

  </div>

)}
    </div>

  )

}