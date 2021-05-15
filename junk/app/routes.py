# from flask import Flask, render_template, request, redirect, url_for

# app = Flask(__name__)

# @app.route('/')
# def home(): 
#     return render_template('Theme.html')

# db={'tbob3211': '22629772', 'chenze': '23148505'}

# @app.route('/login', methods=["GET", "POST"])
# def login():
#     error = None
#     if request.method == 'POST':
#         if request.form["username"] not in db:
#             error = "access denied, username not found"
#         else:
#             if db[request.form["username"]] != request.form["password"]:
#                 error = "access denied, password not found" 
#             else: 
#                 return redirect(url_for('home'))

#     return render_template("login.html", error = error)

# @app.route('/arancini')
# def arancini(): 
#     return render_template('Pizza.html')

# if __name__=="__main__":
#     app.run(debug=True)

from app import app

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"