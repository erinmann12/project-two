import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template
import json
import pprint


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
quarterly_states = Base.classes.quarterly_states
state_percent_increase = Base.classes.state_percent_increase

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

    # Create a dictionary from the row data and append to a list of adata
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

# -------------------------------------------------------------------
# API endpoint four
# -------------------------------------------------------------------
@app.route("/api/v1.0/quarterly_states")
def quarterly_states_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of quarterly_states_data"""
    # Query all states
    results = session.query(quarterly_states.hpi_type, quarterly_states.purchase_type, quarterly_states.frequency, quarterly_states.location, quarterly_states.place_name,
        quarterly_states.place_id, quarterly_states.year, quarterly_states.period,quarterly_states.price).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    quarterly_states_info = []
    for hpi_type, purchase_type, frequency, location, place_name, place_id, year, period, price in results:
        quarterly_states_dict = {}
        quarterly_states_dict["hpi_type"] = hpi_type
        quarterly_states_dict["purchase_type"] = purchase_type
        quarterly_states_dict["frequency"] = frequency
        quarterly_states_dict["location"] = location
        quarterly_states_dict["place_name"] = place_name
        quarterly_states_dict["place_id"] = place_id
        quarterly_states_dict["year"] =  year
        quarterly_states_dict["period"] = period
        quarterly_states_dict["price"] = price
        quarterly_states_info.append(quarterly_states_dict)

    return jsonify(quarterly_states_info)

# -------------------------------------------------------------------
# API endpoint five
# -------------------------------------------------------------------
@app.route("/api/v1.0/quarterly_data")
def quarterly_data():
    session = Session(engine)

    # sorted_state_df = pd.read_sql_table(quarterly_states, con=engine)
    sorted_state_df = pd.read_sql_query("SELECT * FROM quarterly_states", con=engine)
    sorted_state_df['year_period'] = sorted_state_df['year'].astype(str) + "-Q" + sorted_state_df['period'].astype(str)
    sorted_state_df = sorted_state_df.loc[sorted_state_df['hpi_type'] == 'traditional']
    sorted_state_df = sorted_state_df.loc[sorted_state_df['purchase_type'] == 'all-transactions']
    pivoted = sorted_state_df.pivot(index='year_period', columns='place_name', values='price')
    session.close()

    return pivoted.to_json(orient='index')

# -------------------------------------------------------------------
# API endpoint six
# -------------------------------------------------------------------
@app.route("/api/v1.0/state_increase")
def percent_increase():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of state_percent_increase"""
    # Query all states
    results = session.query(state_percent_increase.place_name, state_percent_increase.place_id,
        state_percent_increase.year,state_percent_increase.period1, state_percent_increase.price1,
        state_percent_increase.period4, state_percent_increase.price4, state_percent_increase.yearly_change).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    state_percent_increase_info = []
    for place_name, place_id, year, period1, price1, period4, price4, yearly_change in results:
        percent_increase_dict = {}
        percent_increase_dict["place_name"] = place_name
        percent_increase_dict["place_id"] = place_id
        percent_increase_dict["year"] =  year
        percent_increase_dict["period1"] = period1
        percent_increase_dict["price1"] = price1
        percent_increase_dict["period4"] = period4
        percent_increase_dict["price4"] = price4
        percent_increase_dict["yearly_change"] = yearly_change
        state_percent_increase_info.append(percent_increase_dict)

    return jsonify(state_percent_increase_info)

if __name__ == '__main__':
    app.run(debug=True)