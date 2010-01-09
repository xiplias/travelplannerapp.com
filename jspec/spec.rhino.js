
load('/opt/local/lib/ruby/gems/1.8/gems/jspec-2.11.13/lib/jspec.js')
load('public/javascripts/application.js')

JSpec
.exec('jspec/spec.application.js')
.run({ formatter: JSpec.formatters.Terminal })
.report()