import requests

contract_address = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'  # USDT TRC20 contract address
wallet_address = 'TLMZG2SVuGdK5ic7ebboJSrdtrtBQNGgZE'  # wallet address

url = f"https://apilist.tronscan.org/api/account?address={wallet_address}&includeToken=true"

headers = {"accept": "application/json"}

response = requests.get(url, headers=headers)

data = response.json()

if 'error' in data:
    print(f"Error: {data['error']}")
else:
    usdt_balance = None
    print(data)
    for token in data['trc20token_balances']:
        if token['tokenName'] == 'Tether USD':
            usdt_balance = round(float(token['balance'])*pow(10,-token['tokenDecimal']),6)
            break

    if usdt_balance is not None:
        print(f'USDT TRC20 balance in {wallet_address}: {usdt_balance}')
    else:
        print(f'USDT TRC20 token not found in {wallet_address}')
        

