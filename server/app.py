from flask import Flask, render_template
from flask_socketio import SocketIO, send
from Raspbot_Lib import Raspbot
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

robot = None


def initialize_robot():
    global robot
    try:
        robot = Raspbot()
        print("Initialize")
        return True
    except Exception as e:
        print(f"Errpr:{e}")


@app.route('/')
def index():
    return render_template('test.html')

@socketio.on('message')
def handle_message(msg):
    print('Message received: ' + msg)
    send(msg, broadcast=True)
    #robot.Ctrl_BEEP_Switch(1)
    # robot.Ctrl_Muto(0,50)
    # time.sleep(1)
@socketio.on('Muto')
def control_muto(data):
    # left front
    robot.Ctrl_Muto(0,data[leftPower])
    # right front
    robot.Ctrl_Muto(1,data[rightPower])
    # left back
    robot.Ctrl_Muto(2,data[leftPower])
    # right back
    robot.Ctrl_Muto(3,data[rightPower])
    




if __name__ == '__main__':
    if initialize_robot():
        print("start")
    else:
        print("error-desu")
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)