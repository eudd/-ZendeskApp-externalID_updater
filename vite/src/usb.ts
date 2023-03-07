import './usb.css';
import ZAFClient from "zendesk_app_framework_sdk";
import Language from './language';

const client = ZAFClient.init();

const form = document.querySelector("form");
form?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const form = <HTMLFormElement>e.target;
  const externalIdInput = <HTMLInputElement>form?.querySelector("input#external_id");
  updateExternalID(externalIdInput?.value)
})

client.on('user.externalId.changed', function(d){
  const externalIdInput = <HTMLInputElement>form?.querySelector("input#external_id");
  externalIdInput.value = "";
  externalIdInput.placeholder = d;
})

async function getUserInfo() {
  try {
    const data = await client.get(['user.externalId', 'currentUser.locale']);
    const label = <HTMLLabelElement>form?.querySelector("label");
    Language[data['currentUser.locale']] && (label.innerText = Language[data['currentUser.locale']])
    const externalIdInput = <HTMLInputElement>form?.querySelector("input#external_id");
    externalIdInput.placeholder = data["user.externalId"]??"";
  } catch (error) {
    console.error(error);
    client.invoke('notify', "external id를 불러오는데 오류가 발생했습니다.", "error", {sticky: true});
  }
}
getUserInfo();

async function updateExternalID(external_id: string) {
  try {
    if ( !external_id) {
      client.invoke('notify', "external_id가 없습니다.", "error", {sticky: true});
      return;
    }
    await client.set('user.externalId',external_id);
  } catch (error) {
    console.error(error)
  }
}



