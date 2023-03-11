
const assert = chai.assert;

suite('font', function(){
  suite('sizes', function(){
    test('S10008', function(){
      assert.deepEqual(ssw.ttf.font.symbolSize(1),[15,30]);
      assert.deepEqual(ssw.ttf.font.symbolSize(9),[15,30]);
    });
  })
})

suite('fsw', function(){
  suite('symbolSvg', function(){
    test('S10000', function(){
      assert.equal(ssw.ttf.fsw.symbolSvg('S10000-CP10G_green_Z2'),`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="70" height="100" viewBox="482 475 35 50">
  <text font-size="0">S10000-CP10G_green_Z2</text>
  <rect x="482" y="475" width="36" height="50" style="fill:green;" />
  <g transform="translate(492,485)">
    <text class="sym-fill" fill="white" style="pointer-events:none;font-family:\'SuttonSignWritingFill\';font-size:30px;">􀀁</text>
    <text class="sym-line" fill="#0000CC" style="pointer-events:none;font-family:\'SuttonSignWritingLine\';font-size:30px;">󰀁</text>
  </g>
</svg>`);
    });
  })
  suite('symbolPng', function(){
    test('S10000', function(){
      let expected = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABkCAYAAAA7Ska5AAABgklEQVR4Xu3coVICURiG4Z9qwaqF4gVYNRqNXo/BwPUYiUStXoCFolWLFcfZppzBDxyHs/OQzzKzL89+BYZJ3dW6vH4UmAizWYUwjadFGGGyISWGGGKyAsRkvWwMMcRkBYjJetkYYojJChCT9bIxxBCTFRiVmI9p1f286vliuK2zx6qb26qj9z+J8vUmfW6MMA0AwgiTbQMxxBCTFSAm62VjiCEmK0BM1svGEENMVoCYrJeNIYaYrAAxWS8bQwwxWQFisl42hhhisgLEZL1szFjEfP8kMwe7nz74XzsI80viuxvIriSm0au3MKfnq3pYXNXs5DgTsOX06vWtLq+X9fI0G04KM3QQpiFHGGGyCSKGGGKyAsRkvWwMMcRkBYjJetkYYojJChCT9bIxxBCTFSAm62Vjxiomc7DH6d6+JdjjVrNLhWn0EqbXMNkDcNCn+/xvh39IKkwjsjDCZM8fMcQQkxUgJutlY4ghJitATNbLxhBDTFaAmKyXjSGGmKxA4/Qnv3zEH6Oa9DwAAAAASUVORK5CYII=';
      expected = expected.slice(0,66);
      let generated = ssw.ttf.fsw.symbolPng('S10000-CP10G_green_Z2');
      assert.equal(generated.length>400,true);
      generated = generated.slice(0,66);
      assert.equal(generated,expected);
    });
  })
  suite('symbolNormalize', function(){
    test('S10000-CP10G_green_Z2', function(){
      assert.equal(ssw.ttf.fsw.symbolNormalize('S10000-CP10G_green_Z2'),'S10000492x485-CP10G_green_Z2');
    });
  })
  suite('symbolMirror', function(){
    test('S10000', function(){
      assert.equal(ssw.ttf.fsw.symbolMirror('S10000'),'S10008');
    });
    test('S10008', function(){
      assert.equal(ssw.ttf.fsw.symbolMirror('S10008'),'S10000');
    });
  })
  suite('symbolRotate', function(){
    test('S10000', function(){
      assert.equal(ssw.ttf.fsw.symbolRotate('S10000'),'S10007');
    });
    test('S10000 counter clockwise', function(){
      assert.equal(ssw.ttf.fsw.symbolRotate('S10000',false),'S10001');
    });
  })
  suite('symbolFlop', function(){
    test('S10000', function(){
      assert.equal(ssw.ttf.fsw.symbolFlop('S10000'),'S10010');
    });
    test('S10000 minus', function(){
      assert.equal(ssw.ttf.fsw.symbolFlop('S10000',false),'S10050');
    });
  })
  suite('symbolScroll', function(){
    test('S10000', function(){
      assert.equal(ssw.ttf.fsw.symbolScroll('S10000'),'S10100');
    });
    test('S10000 minus', function(){
      assert.equal(ssw.ttf.fsw.symbolScroll('S10000',false),'S10000');
    });
    test('S10100 minus', function(){
      assert.equal(ssw.ttf.fsw.symbolScroll('S10100',false),'S10000');
    });
  })
  suite('signSvg', function(){
    test('Sign with style', function(){
      assert.equal(ssw.ttf.fsw.signSvg('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475-P10G_green_D_yellow,ff0ff0_Z2'),`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="138" height="178" viewBox="466 456 69 89">
  <text font-size="0">AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475-P10G_green_D_yellow,ff0ff0_Z2</text>
  <rect x="466" y="456" width="69" height="89" style="fill:green;" />
  <g transform="translate(483,510)">
    <text class="sym-fill" fill="#ff0ff0" style="pointer-events:none;font-family:\'SuttonSignWritingFill\';font-size:30px;">􋛩</text>
    <text class="sym-line" fill="yellow" style="pointer-events:none;font-family:\'SuttonSignWritingLine\';font-size:30px;">󻛩</text>
  </g>
  <g transform="translate(501,466)">
    <text class="sym-fill" fill="#ff0ff0" style="pointer-events:none;font-family:\'SuttonSignWritingFill\';font-size:30px;">􀀒</text>
    <text class="sym-line" fill="yellow" style="pointer-events:none;font-family:\'SuttonSignWritingLine\';font-size:30px;">󰀒</text>
  </g>
  <g transform="translate(510,500)">
    <text class="sym-fill" fill="#ff0ff0" style="pointer-events:none;font-family:\'SuttonSignWritingFill\';font-size:30px;">􋚥</text>
    <text class="sym-line" fill="yellow" style="pointer-events:none;font-family:\'SuttonSignWritingLine\';font-size:30px;">󻚥</text>
  </g>
  <g transform="translate(476,475)">
    <text class="sym-fill" fill="#ff0ff0" style="pointer-events:none;font-family:\'SuttonSignWritingFill\';font-size:30px;">􀀚</text>
    <text class="sym-line" fill="yellow" style="pointer-events:none;font-family:\'SuttonSignWritingLine\';font-size:30px;">󰀚</text>
  </g>
</svg>`);
    });
  })
  suite('signPng', function(){
    test('sign png with style', function(){
      let expected = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAACyCAYAAACdrlekAAAUhUlEQVR4Xu2deXxVxRXHfwkgiSELYUsAhSAWSguWuiJaZdFqWa1oQVBERQmrEquIFlCoqHWpgoBRoFgQilpRNkVlKaAVtZZYLBWQRUjYF8NOCP0cbq7vvsld5r737p257839hw+fzMydOef7zsydOedMEsbgDNSjJOAggSQFimKERwIKFB4pqTJQoCgIuCSgQOESkyqkQFEMcElAgcIlJlVIgaIY4JKAAoVLTKqQAkUxwCUBBQqXmFQhBYpigEsCChQuMalCChTFAJcEFChcYlKFFCiKAS4JKFC4xKQKKVAUA1wSUKBwiUkVUqAoBrgkoEBxENO49kCdc4EHlwClJ7lkGpeFFCg2an21C3DHRUCVZGDOf4D8BYkLiwLFApQ/tgeGtwFSqmoFTp9JbFgUKBagjG0HFFwJpFaAkuiwKFBsph7WqiQyLAoUh6WnFSyzioC+8+Jy3Wo6KAUKh64n/ga4u3VovaJblkSCRYHCAQoV+Ut3oHdLoGpyqEJZOTDra+DOBLAsChROUKjYDIKlFVAlKVTp5Gng9bVA//kuGgpgUQWKS6UlKiwKFJegpJ8DTO8OdG8eblmOlwFTvwIGL3LZYECKK1AiUBTBMrsHcEPTyrC89Bnw8EcRNCp5FQVKhAoiWP7+O6BDE8CwZAFZluc/BR5dGmHDklZToEShmESCRYESBShUtUUdYEpn4Krzwy0LnTQ/9wnw+IooXyBJdQVKDBRBsEzvBlzaIByWQyeAJ1cCz6yOwUsEN6FAiZECCJbZNwOt6oU3ePA4MHo5QIvcID8KlBhqzw6WRz4GpnwRw5f53FRCgEKLzqc6Aks2Ae/+z1sJX9EQKOwCtKxb2bIEGZa4B8X4ZXLYpwXmjU2BF28ELswOh2X/Me2zOYiWJa5BMft89etrhGCZ3BlolBkOy+4jAFmWaV95a9li3XrcgmK1x+EXKKQogoWmoYYZ4WorLtV2b2cWxVqd3rUXl6BYQXKsTNvb+MMy7wTKttytmWZZcmuE/2X7D8C984HFG/3rSzRvijtQ7A7tRGyt657851SprKYgwRJ3oJi5AYg6f3m6IzD08nDPOBaXrYe0MBDZLUtcgWLmhSYKEjNfWyvTv2E/MGyx3LDEDShWkIg49h99jRbqQdMg7/PfvcDAhcDyLbw1/C0XF6CYrQNEORLRVPP4tUBWintFFu0Cer0NfLPHfV2vawQeFDMPeVGQDLgEGN8hMkh0RcsKS6BBMVsHiHJ2vqu1BkndtOh+23TLFsFym2SWJbCgmEEiKnyiTyuAvnDqp0cHiV6bYPl8B9DvXXmmoUCCYhUXLCIgizbUaPpjd1+jRYZgWbZZi0ak/RbRT+BAMfuioEwDIiAx26I/XQ58u7IFUi/4Ho0blkalX4Ll4++A3/5NfLqNQIFiBcm89UC/ef4K0wqS71b9DE16L8LBK1bg8Ev3oVHusbiAJTCgmEFCv7gPNwE95voPCXsyfOYMsGnt+cjrshJVSrUj431d5uLki4ORmx1dqiZR4zQSHghQrCARYZbN3AdIkRu+boALer6PKjvOC7MgBEvZhEGol3UqKstC06sIy6l3WnpQHmoLjLwayKwekrOoudvKx6R4Sy3k9JyP5PUtTGHY03U2yl8aGhNYRKUIkxoUs11OgmTVNmDAAn8/HS0h2ZqNnHtmI/nzy20txv6bZ+H0sw+gTs3opiFRC3dpQTHb5RS1GWW1T3JwXxoyBkxD8oe/5ppWDtxRiLKxj6JOZvTTkN9feVKCQpDQhlp2arj8RWxvW3rWu4REH8mh/D8Dj41FZtppLrisCh05BYz82L8wEOlAsdoKX7cHuPVNf6cbUpKVt9zuQ1Vxeswo5E4f6lrh24eORcYjLyAjtdx1Xb2C3+6UUoFitxUuMuqOdl3JIapdXngk4K6D1VCt4M/Ifru3a4VvuX8Msh9+KSJYRDhoSwOKlSOyUQMUdScqNsYKlr37U5A6+BWkLermGpb/jhyO+kOmIzOVVl98j6iQDylA4YFEF6MoQdH7rQLSCZb0gVNR/f1OfNo2lNrx6AhkDClEeorzNCRy7MJBsfrstJO43/OzsS9WAenFO9NQ6/7CiGDZ+cRwpN/3F6RVt4ZFpDWl8QsF5drGwKROwE9ru/4hnj1RFRXuYAVLyY5MZA+chuorOrge0K7xQ5DVfyaqV608DYmGRCgoVjG6biQsGpY3KrIXGDMuFW/NRt3+s1B1TRs3Qzlbdv3iS9G8zYawerJkQxBiUaz2JlxLFoBIp2SrcTht6ZuNc83oe9Es/01kpoQsiiyQCLEoJFyzX2IkkOh1vt6tTUP/3B5NK5HVjQUsRQ8VoNHwaWGQiNwOMJOErxbFam6PTEXhtUTs2uo9MIOF7AJZllybw0KqT5Cc98A01DR8IvsZH80re99AsdqH4O2oXk470q9/9r8XtiwOy8goEhazhTn1dduGujjv9nmmJ8tFg0ah7sMTkZMR+toRER/NowNfQLHaBufpoLGM0e8jKb0Um6fdjCYtSn6ERdShod5Hs7wo1KfvvslF3l1vh8FiBomoqEYePXgOCkHy1q3AdReEb3/zdI6FhBV4efNvUDKnC+o33hcGi0gPdrPNQ9ax6T/3j0TOg1NQu0bIkhAkIqIaefXgKShWmQV4O2ecbrZsrI3cvm8jZd1FYdUJlp0VsBjLywjLt2sboHzJdcgdNANZ54a+bkQFrLnRg6egmGUWcNM5Kkvi3LotAzm95leCRG/r+BWrsLewDxqef/DH5kXHxpiFcVCfyLc2OYC3c3gGSiwgIa1v+T4dOT0XWEJihGXna73CQiREw+IUGCYqYM3tj5XKewIKT14Qns5u3p6GmgNmIGtVR57i2Hfde5VCJPQFLrlOithnsYIlSJB4AoqbvCB22t+yMwXpQwpR68OuXJDohay83tfu0hyfvt3nqrmYFGZhCRoknoBiFu7pVtrbdldHWsEE1Jp/q9uq2DPiD0gd9jJqGLzHRDkkGzuvr1koiD2IN4Z5MvVEY1WK91dDecGzaPhOX9eQHBj2NKqOeAbpqSF/VBkg0QdCm3JNagYvdagnFkUXSiSwkGvhqQcig4SclpNHja0EicigKdekS1zBE4uij9csyY2VLGINiQxhmBLr3XXXPAWFemOWW43tJUFS9tB4NJh7j+sBkCVJemwcMtLKwvZQRISbuu58gCp4DgrJwm5PpeRANZx57AnUn5XvWmwH73kZZ0aPQc30UECVqHBT150PWAVfQLGC5UQZsH5GZ1xUMNO12Er7TMXJcSNRK+tEmCUREW7quvMBrOAbKFbnPiWHquCH349Ds7n8FuVot7dw9IXBqJ19PAwSGXOfBZAJ0y77Bgq93eokmWA5VvAUmrzV31GuJ25YiNJJd4dBQpVE+qI4djoOCvgKig6L2TWwm3adg+ThLyBvoXXUHUFyeNLdqGWwJAoSfyj0HRQ7WDYUpyAjfyrqragcSHXWkkzsj9q1j4ZJRqS/bKQqIsv6eDug58+1dKNVDKfJtBg/egooKQXmfwuMXuZvNimrMQkBhTpj5Rq5sTgFWQNmoPY/QqkkCJKDLwxAvdzw5HkiPfAjhcSN37D+BUdpREVnhhQGih0sxgPBsl8tx95JdyKnYcjXhOoG4aIBFibWJZSSJ9Mdh/uOAr1bmefOl+VzXygoJEireN4du1KR/tSYs4vceg0PhMk8iJCwWwSsfyxll3qyA5BWrbKtOlUOTPgMKFgSqR2Lvp5wUHRYzC6YLme8wahsUO63YVVD65GXfxNKDvTxZqDj6+GlFtwGdLrQXKk7SoE73gGWbo5e6ZG0IAUodrAYBxVUSGgMRggoW9KIj4CJa8JVNvBSLVV6DZPrW2gKokR/lCNfxCMNKE6wBBkS8syf3h2oV3GhwpaDmhPV58XhKqc1zIp+QOsccxRIBj3fEuOpJxUoVrAEGRIa0+ROwL0Xh5yql20B2s8wh2FqV6Bfa/PQFlrXPLECGL/Kf5siHSgsLBsDcI2ak9q+vBf4Za5WiqaQV78E7ltgXmvwZdqt72aLWqrx3v+AbnOc3hj7v0sJig4LCW3uOnmvT+NRR5efAK91Dd3jc+I08ORKzTKYPe3zgNdvAhpYXOlCP5xOb/jv+ystKDxKCEKZJ9oBD7cF9OtsKUsB3R34xtfWvV83UNs2MHt46nshFwWKF1I1tEmOW30NwY08n7lL+wLtGpt3jDbp/vQJ8NhSjzvONK9A8VjeH90BdMgLvWT9XuCyV+3Pb9g6bBenfgXc857HHVeg+CtgVul0A+nPJtn3gbVCbGkRC1plUTzmhgXFbEeW7QItfu9ubd0xnjZiPSwFSqwlyrRn/DSmP/EoWYHisVJkbJ79gvnbOm131e6hMJf8S8KzHhjLf/I90Haav6NVFsVjebOg8CxE2U9qtos865xYD0uBEmuJMu0pUDwWcLw0r0DxSZO3twJ6tAAaZ2nH73UqTmD3HAEoYS+Z4ZlFwAebfOqQy9cYQSH/mslfAIMX2Teiph4XQqYj96ndgJuaA1WT7SvSqSrBMvwDORyRjb01gkK7qk+vBkYtsx8PXbY5vE1o258trW/auRBn1EWlXaPYhaFSIhqK4yFALmuggST6ulczTVxaH5h7i2YN6eEFJWqtetCAlKDYpcxg850Yy5IinvtUu2tPhoc9CdZB+dNq4PoLgHNN/GNj0W+yOKxTVLTtSgeK0zH76u+BG2eGphiaohb3AdpW3EvNc+gWrdB461uBQlMPT5YH3vcYy3kVwiIdKHShAjkiG6820QVh5eFldPYR7VtqVJodKFQu1rB4GZ0gFSh0h8+cHkCjTPPfkpWv6U9qAQtvA5pma/VE+pa6ASWWsHjtLioVKOQCSKv9ahZfOUs2Ab+2yJDxbk+gazO5Fo00La7pDzSvuOHMajEbrWXx44IrqUBZfRdwZcVag7Up9KXz4mfAgxZBUM9eDwy7PPQpLeIo3swO8n4eRwqLH5DQuKQBxWkRe/gkMOx964yKdLH2izeEYmJE+ZaysLCg2HmnuYWFIKHNOwpL9fqRBpSH2gJjrgVSq5oPueQw0Pcd4MPvzP9+XRNgxk1Abg3t73T1K2WrfvMbr0Vo377bLXze1PB+39QqDShOPhhOLoTsgtbJ290vfNyCQv1ygkXE/cfSgOLkJ/qvEuDiQv5fr1P8jMyg0CJ4cmdtm8CYO4X6LOpq28CAwuMZxsK2cAPQ+Q2/kDB/T1E+0LJu6G88/ihUmmCZ3QO4oWkIFlGQSLWYdbIoM9YCd86zV/oHfbStcf0R4eDD9pAdF4+Hm96GMefdoePA6OXaLWEiHmksit2nMQmG95coQoh274zEudrYnn6Kvm438LhFdKEfY5YGFLvoOFFBT7FQQLSgxKIPsWgjMKDw+HHoAqGjAEpaQ4kAnaarWAjRro1IpsP+v9Q2HquY7FD/cELzvfH7kqq4A8V4/7AMFyi90hnof3HokNPqvMoIm511FfXZHwhQ6NLoMcuBZ1bb//7N7h0WDQubxmL3ES0clFKDmj1Xnw/QCTplzTR7RG0kBgIUuoJ+0ELgr0XWoBAktPdAJ8+HTyRh+987ovrVnyCv4RGIhIX1cnOC/raWwKROQGZ187Gu2wO0ec1/l8+4AMV4deyhY0kontAPP33yeRy+cjn2Ft5+9uZSkbAY87c5bQSOaw/8/kpzf1lyzi78Eshf6PXKqnL7UoDC/urYbtpZFCMkPxxPQsmU3mg2ZuKPTcgAyyNXAaOuAVIqzrHsIv2M7hKsHERNO9QPKUBxOjm2AsV4vT1NNzun34KmIyrv8xthoU9tvy9/pHOo93oBzWppqt91BOg3D1i8MRwFJ8etlduAX03335oEGhReSHSxGmERccX9c9cDQy7XnLIowfDzn2opRI2PsQyLA6UcJafxhN6ZdWtRjAvXY6eArR9cgcylNzr+1Mpq7kfygFfQoM7xs6EepKxHfcpcRFaFQjcuqqd1k/Z4eswN5WIja0JfO3kVoR3sYFincsfBxrhA4KYe4z5JtLLwG5YBlwDjOwBZKVoc0qwioO886wsk9PHR2mTQIi0hsahHClBY31KrxSzlZ6Vf3S8sEvZGIkS68oTibCgeyI/HGIdEX0DkgJScBOTUsI488NPyWclAClCoc3a7kVYpwf1QrBfvIG++EVcBNVPsWz9wHHhqlfNGoxd9ZNsMBCi8oZiUcpOsje7sQyabfFJkfKivvX4ONMrS3Dfpgid6th0CCBBykSAHcfpXhieuQGGzAMjgjyKDkmPRh7gChd3VVKDEAhGtjUCA4rTtrYuDddBWoCQYKDRcHg83FhTaq2g1OXbCSuSWpLEoTj6zPL6mLCg8DtmJrHw3Yw8MKDxKjxe3QzcK9KtsYEDhiethLxuwC2r3S8Dx8h5pQGF9S1kB8yxMI4nKixdFej0OaUBhfUvZgTtlUmJdCIPsue+10iNpXxpQnK5Ic7rQ6JYWwJTOoetinbIfRCKsRK4jDShOXm5O3udsNgQnC5TISo9k7NKAQp23uyCa/m4XVsre7smz+I1EYIlaRypQWN9SVil2vqbG6054M0QnqtIjGbdUoLC+pbwLWnZ9YuWTGomAVB1NAlKBQh2y8xu18jVlL6CWId1FvAEmHSisbykrcMql2n1OyE+D9beVwW0w3iCR0qJQp4y+pazQ6SR52WbN1/TsArc70C5PcyMkizPhM6DAInNkPCrQrzFJZ1H0gdvlw6cyFJpJj54ckJyVyfk4f4H/4ZZ+KUvke6QFhYTC61tKm2vT/w0MXSxSlPH9bqlBIdGTbyllpKbrVijmhTzW9YesypodwJQv5PEtjVdcpAclXgUftHEpUIKmMUH9VaAIEnzQXqtACZrGBPVXgSJI8EF7rQIlaBoT1F8FiiDBB+21CpSgaUxQfxUoggQftNcqUIKmMUH9VaAIEnzQXqtACZrGBPVXgSJI8EF7rQIlaBoT1F8FiiDBB+21CpSgaUxQfxUoggQftNcqUIKmMUH9VaAIEnzQXqtACZrGBPX3/05Roojqz4t7AAAAAElFTkSuQmCC';
      expected = expected.slice(0,66);
      let generated = ssw.ttf.fsw.signPng('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475-P10G_green_D_yellow,ff0ff0_Z2')
      assert.equal(generated.length>400,true);
      generated = generated.slice(0,66);
      assert.equal(generated,expected);
    });
  })
  suite('signNormalize', function(){
    test('sign with style', function(){
      assert.equal(ssw.ttf.fsw.signNormalize('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475-P10G_green_D_yellow,ff0ff0_Z2'),'AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475-P10G_green_D_yellow,ff0ff0_Z2');
    });
  })
})

suite('swu', function(){
  suite('symbolSvg', function(){
    test('񀀁', function(){
      assert.equal(ssw.ttf.swu.symbolSvg('񀀁-CP10G_green_Z2'),`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="70" height="100" viewBox="482 475 35 50">
  <text font-size="0">񀀁-CP10G_green_Z2</text>
  <rect x="482" y="475" width="36" height="50" style="fill:green;" />
  <g transform="translate(492,485)">
    <text class="sym-fill" fill="white" style="pointer-events:none;font-family:\'SuttonSignWritingFill\';font-size:30px;">􀀁</text>
    <text class="sym-line" fill="#0000CC" style="pointer-events:none;font-family:\'SuttonSignWritingLine\';font-size:30px;">󰀁</text>
  </g>
</svg>`);
    });
  })
  suite('symbolPng', function(){
    test('񀀁', function(){
      let expected = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABkCAYAAAA7Ska5AAABgklEQVR4Xu3coVICURiG4Z9qwaqF4gVYNRqNXo/BwPUYiUStXoCFolWLFcfZppzBDxyHs/OQzzKzL89+BYZJ3dW6vH4UmAizWYUwjadFGGGyISWGGGKyAsRkvWwMMcRkBYjJetkYYojJChCT9bIxxBCTFRiVmI9p1f286vliuK2zx6qb26qj9z+J8vUmfW6MMA0AwgiTbQMxxBCTFSAm62VjiCEmK0BM1svGEENMVoCYrJeNIYaYrAAxWS8bQwwxWQFisl42hhhisgLEZL1szFjEfP8kMwe7nz74XzsI80viuxvIriSm0au3MKfnq3pYXNXs5DgTsOX06vWtLq+X9fI0G04KM3QQpiFHGGGyCSKGGGKyAsRkvWwMMcRkBYjJetkYYojJChCT9bIxxBCTFSAm62Vjxiomc7DH6d6+JdjjVrNLhWn0EqbXMNkDcNCn+/xvh39IKkwjsjDCZM8fMcQQkxUgJutlY4ghJitATNbLxhBDTFaAmKyXjSGGmKxA4/Qnv3zEH6Oa9DwAAAAASUVORK5CYII=';
      expected = expected.slice(0,66);
      let generated = ssw.ttf.swu.symbolPng('񀀁-CP10G_green_Z2');
      assert.equal(generated.length>400,true);
      generated = generated.slice(0,66);
      assert.equal(generated,expected);
    });
  })
  suite('symbolNormalize', function(){
    test('񀀁-CP10G_green_Z2', function(){
      assert.equal(ssw.ttf.swu.symbolNormalize('񀀁-CP10G_green_Z2'),'񀀁𝣾𝣷-CP10G_green_Z2');
    });
  })
  suite('symbolMirror', function(){
    test('񀀁', function(){
      assert.equal(ssw.ttf.swu.symbolMirror('񀀁'),'񀀉');
    });
    test('񀀉', function(){
      assert.equal(ssw.ttf.swu.symbolMirror('񀀉'),'񀀁');
    });
  })
  suite('symbolRotate', function(){
    test('񀀁', function(){
      assert.equal(ssw.ttf.swu.symbolRotate('񀀁'),'񀀈');
    });
    test('񀀁 counter clockwise', function(){
      assert.equal(ssw.ttf.swu.symbolRotate('񀀁',false),'񀀂');
    });
  })
  suite('symbolFlop', function(){
    test('񀀁', function(){
      assert.equal(ssw.ttf.swu.symbolFlop('񀀁'),'񀀑');
    });
    test('񀀁 minus', function(){
      assert.equal(ssw.ttf.swu.symbolFlop('񀀁',false),'񀁑');
    });
  })
  suite('symbolScroll', function(){
    test('񀀁', function(){
      assert.equal(ssw.ttf.swu.symbolScroll('񀀁'),'񀁡');
    });
    test('񀀁 minus', function(){
      assert.equal(ssw.ttf.swu.symbolScroll('񀀁',false),'񀀁');
    });
    test('񀁡 minus', function(){
      assert.equal(ssw.ttf.swu.symbolScroll('񀁡',false),'񀀁');
    });
  })
  suite('signSvg', function(){
    test('Sign with style', function(){
      assert.equal(ssw.ttf.swu.signSvg('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭-P10G_green_D_yellow,ff0ff0_Z2'),`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="138" height="178" viewBox="466 456 69 89">
  <text font-size="0">𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭-P10G_green_D_yellow,ff0ff0_Z2</text>
  <rect x="466" y="456" width="69" height="89" style="fill:green;" />
  <g transform="translate(483,510)">
    <text class="sym-fill" fill="#ff0ff0" style="pointer-events:none;font-family:\'SuttonSignWritingFill\';font-size:30px;">􋛩</text>
    <text class="sym-line" fill="yellow" style="pointer-events:none;font-family:\'SuttonSignWritingLine\';font-size:30px;">󻛩</text>
  </g>
  <g transform="translate(501,466)">
    <text class="sym-fill" fill="#ff0ff0" style="pointer-events:none;font-family:\'SuttonSignWritingFill\';font-size:30px;">􀀒</text>
    <text class="sym-line" fill="yellow" style="pointer-events:none;font-family:\'SuttonSignWritingLine\';font-size:30px;">󰀒</text>
  </g>
  <g transform="translate(510,500)">
    <text class="sym-fill" fill="#ff0ff0" style="pointer-events:none;font-family:\'SuttonSignWritingFill\';font-size:30px;">􋚥</text>
    <text class="sym-line" fill="yellow" style="pointer-events:none;font-family:\'SuttonSignWritingLine\';font-size:30px;">󻚥</text>
  </g>
  <g transform="translate(476,475)">
    <text class="sym-fill" fill="#ff0ff0" style="pointer-events:none;font-family:\'SuttonSignWritingFill\';font-size:30px;">􀀚</text>
    <text class="sym-line" fill="yellow" style="pointer-events:none;font-family:\'SuttonSignWritingLine\';font-size:30px;">󰀚</text>
  </g>
</svg>`);
    });
  })
  suite('signPng', function(){
    test('sign png with style', function(){
      let expected = 'data:image/png;base64,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';
      expected = expected.slice(0,66);
      let generated = ssw.ttf.swu.signPng('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭-P10G_green_D_yellow,ff0ff0_Z2');
      assert.equal(generated.length>400,true);
      generated = generated.slice(0,66);
      assert.equal(generated,expected);
    });
  })
  suite('signNormalize', function(){
    test('sign with style', function(){
      assert.equal(ssw.ttf.swu.signNormalize('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭-P10G_green_D_yellow,ff0ff0_Z2'),'𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭-P10G_green_D_yellow,ff0ff0_Z2');
    });
  })
})
