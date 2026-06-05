const names = [

  "scarlett",
  "emma",
  "ivy",
  "chloe",
  "harper",
  "isabella",
  "naomi",
  "penelope",
  "emily"

]

export function generateSlug() {

  const name =

    names[
      Math.floor(
        Math.random() *
        names.length
      )
    ]

  const random =

    Math.random()
      .toString(16)
      .substring(2,12)

  return `${name}_${random}`

}