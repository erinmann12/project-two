import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


# #################################################
# # Database Setup
# #################################################
engine = create_engine("sqlite:///housingdata.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
print(Base.classes.keys())

# # Save reference to the tables
State = Base.classes.state
usa = Base.classes.usa
puerto_rico = Base.classes.puerto_rico

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

# -------------------------------------------------------------------
# Web Pages
# -------------------------------------------------------------------
@app.route("/")
def home():

    return render_template("index.html")

@app.route("/data")
def data():

    return render_template("data.html")
    
@app.route("/statedata")
def states():

    return render_template("bar_race.html")

# -------------------------------------------------------------------
# API endpoint one
# -------------------------------------------------------------------
@app.route("/api/v1.0/states")
def state_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of state_data"""
    # Query all states
    results = session.query(State.hpi_type, State.purchase_type, State.frequency, State.location, State.place_name,
        State.place_id, State.year, State.period,State.price).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    state_info = []
    for hpi_type, purchase_type, frequency, location, place_name, place_id, year, period, price in results:
        state_dict = {}
        state_dict["hpi_type"] = hpi_type
        state_dict["purchase_type"] = purchase_type
        state_dict["frequency"] = frequency
        state_dict["location"] = location
        state_dict["place_name"] = place_name
        state_dict["place_id"] = place_id
        state_dict["year"] =  year
        state_dict["period"] = period
        state_dict["price"] = price
        state_info.append(state_dict)

    return jsonify(state_info)

# -------------------------------------------------------------------
# API endpoint two
# -------------------------------------------------------------------
@app.route("/api/v1.0/usa")
def usa_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of usa_data"""
    # Query all states
    results = session.query(usa.hpi_type, usa.purchase_type, usa.frequency, usa.location, usa.place_name,
        usa.place_id, usa.year, usa.period, usa.price).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    usa_info = []
    for hpi_type, purchase_type, frequency, location, place_name, place_id, year, period, price in results:
        usa_dict = {}
        usa_dict["hpi_type"] = hpi_type
        usa_dict["purchase_type"] = purchase_type
        usa_dict["frequency"] = frequency
        usa_dict["location"] = location
        usa_dict["place_name"] = place_name
        usa_dict["place_id"] = place_id
        usa_dict["year"] =  year
        usa_dict["period"] = period
        usa_dict["price"] = price
        usa_info.append(usa_dict)

    return jsonify(usa_info)

# -------------------------------------------------------------------
# API endpoint three
# -------------------------------------------------------------------
@app.route("/api/v1.0/puertorico")
def puerto_rico_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of puerto_rico_data"""
    # Query all states
    results = session.query(puerto_rico.hpi_type, puerto_rico.purchase_type, puerto_rico.frequency, puerto_rico.location, puerto_rico.place_name,
        puerto_rico.place_id, puerto_rico.year, puerto_rico.period, puerto_rico.price).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    puerto_rico_info = []
    for hpi_type, purchase_type, frequency, location, place_name, place_id, year, period, price in results:
        puerto_rico_dict = {}
        puerto_rico_dict["hpi_type"] = hpi_type
        puerto_rico_dict["purchase_type"] = purchase_type
        puerto_rico_dict["frequency"] = frequency
        puerto_rico_dict["location"] = location
        puerto_rico_dict["place_name"] = place_name
        puerto_rico_dict["place_id"] = place_id
        puerto_rico_dict["year"] =  year
        puerto_rico_dict["period"] = period
        puerto_rico_dict["price"] = price
        puerto_rico_info.append(puerto_rico_dict)

    return jsonify(puerto_rico_info)


if __name__ == '__main__':
    app.run(debug=True)
