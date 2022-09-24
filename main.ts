input.onButtonPressed(Button.B, function () {
    basic.showNumber(0)
    HX711.tare(10)
})
let average_value = 0
let one_value = 0
HX711.SetPIN_DOUT(DigitalPin.P0)
HX711.SetPIN_SCK(DigitalPin.P8)
HX711.begin()
HX711.set_scale(1650)
basic.showNumber(0)
HX711.tare(10)
basic.pause(1000)
IotLoRaNode.InitialiseRadioOTAA(
"6081F9288FAB6653",
"6081F92047B1891F",
"1FB6B5A33AC6287127D31B82055C517C",
SpreadingFactors.Seven
)
basic.forever(function () {
    one_value = HX711.get_units(1)
    basic.showNumber(one_value)
})
basic.forever(function () {
    average_value = HX711.get_units(20)
    IotLoRaNode.TemperatureValue(input.temperature(), Channels.One)
    IotLoRaNode.AnalogueValue(Math.abs(Math.round(average_value)), Channels.Two)
    IotLoRaNode.GPS(
    47.24941527260488,
    9.343235095143752,
    2502,
    Channels.Three
    )
    IotLoRaNode.loraTransmitPayload()
    basic.pause(25000)
})
