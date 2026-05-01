export let leads = [
  {
    id: 1,
    vin: "WAUZZZ4G...",
    part: "Фильтр Audi A6",
    phone: "+77001234567",
    status: "Новая"
  }
];

export function addLead(lead: any) {
  leads.unshift({
    id: Date.now(),
    ...lead
  });
}
