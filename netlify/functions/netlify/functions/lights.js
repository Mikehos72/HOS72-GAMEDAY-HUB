export async function handler(event) {
  const API_KEY = "f78b635d-28de-46d5-adaf-37aab5d8e7a3";
  const DEVICE = "60:74:F4:D8:96:72";
  const MODEL = "H61D5";

  const { action, color } = JSON.parse(event.body || '{}');

  let cmd;
  if (action === "color" && color) {
    cmd = {
      name: "color",
      value: color
    };
  } else if (action === "off") {
    cmd = {
      name: "turn",
      value: "off"
    };
  } else {
    return {
      statusCode: 400,
      body: "Invalid action or color"
    };
  }

  const response = await fetch("https://developer-api.govee.com/v1/devices/control", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Govee-API-Key": API_KEY
    },
    body: JSON.stringify({
      device: DEVICE,
      model: MODEL,
      cmd: cmd
    })
  });

  const result = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
}
