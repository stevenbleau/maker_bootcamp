#include <Servo.h>

constexpr byte LEFT_FLIPPER_BUTTON = 8;
constexpr byte RIGHT_FLIPPER_BUTTON = 13;
constexpr byte LEFT_FLIPPER_SERVO = 9;
constexpr byte RIGHT_FLIPPER_SERVO = 10;

constexpr byte TARGET_PINS[] = {2, 4, 5};
constexpr byte TARGET_LEDS[] = {3, 11, 12};
constexpr byte TARGET_COUNT = sizeof(TARGET_PINS) / sizeof(TARGET_PINS[0]);
constexpr unsigned long FLASH_DURATION_MS = 140;

Servo leftFlipper;
Servo rightFlipper;
bool targetWasPressed[TARGET_COUNT] = {false, false, false};
unsigned long ledOffAt[TARGET_COUNT] = {0, 0, 0};
unsigned long score = 0;

void setup() {
  Serial.begin(115200);

  pinMode(LEFT_FLIPPER_BUTTON, INPUT_PULLUP);
  pinMode(RIGHT_FLIPPER_BUTTON, INPUT_PULLUP);

  for (byte target = 0; target < TARGET_COUNT; target++) {
    pinMode(TARGET_PINS[target], INPUT_PULLUP);
    pinMode(TARGET_LEDS[target], OUTPUT);
  }

  leftFlipper.attach(LEFT_FLIPPER_SERVO);
  rightFlipper.attach(RIGHT_FLIPPER_SERVO);
  leftFlipper.write(15);
  rightFlipper.write(165);

  Serial.println("Pinball ready. Score: 0");
}

void loop() {
  leftFlipper.write(digitalRead(LEFT_FLIPPER_BUTTON) == LOW ? 70 : 15);
  rightFlipper.write(digitalRead(RIGHT_FLIPPER_BUTTON) == LOW ? 110 : 165);

  for (byte target = 0; target < TARGET_COUNT; target++) {
    bool isPressed = digitalRead(TARGET_PINS[target]) == LOW;

    if (isPressed && !targetWasPressed[target]) {
      score += 100;
      digitalWrite(TARGET_LEDS[target], HIGH);
      ledOffAt[target] = millis() + FLASH_DURATION_MS;
      Serial.print("Target hit! Score: ");
      Serial.println(score);
    }

    if (ledOffAt[target] != 0 && millis() >= ledOffAt[target]) {
      digitalWrite(TARGET_LEDS[target], LOW);
      ledOffAt[target] = 0;
    }

    targetWasPressed[target] = isPressed;
  }
}